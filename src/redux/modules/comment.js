import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, realtime } from "../../shared/firebase";
import "moment";
import moment from "moment";
import firebase from "firebase/app"; //얘를 불러오면 firebase의 기능! 함수들을 사용할 수 있다.
import { actionCreators as postActions } from "./post";

const GET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const getComment = createAction(GET_COMMENT, (post_id, comment_list) => ({
    post_id,
    comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
    post_id,
    comment,
}));

const loading = createAction(LOADING, is_loading => ({ is_loading }));

const initialState = {
    list: {},
    is_loading: false,
};

const getCommentFB = post_id => {
    return function (dispatch, getState, { history }) {
        const commentDB = firestore.collection("comment");
        if (!post_id) return; //포스트아이디를 받아오지 않고 있으면 바로 리턴하기!

        //where은 ()에 들어있는 조건을 일치하는 데이터들을 가져오며, orderBy로 정렬한다.
        commentDB
            .where("post_id", "==", post_id)
            .orderBy("insert_dt", "desc")
            .get()
            .then(docs => {
                let list = [];
                docs.forEach(doc => list.push({ ...doc.data(), id: doc.id }));
                dispatch(getComment(post_id, list));
            })
            .catch(err => console.log("댓글 정보를 가져올 수 없습니다."));
    };
};

const addCommentFB = (post_id, contents) => {
    return function (dispatch, getState, { history }) {
        const commentDB = firestore.collection("comment");
        const user_info = getState().user.user;
        let comment = {
            post_id,
            user_id: user_info.uid,
            user_name: user_info.user_name,
            user_profile: user_info.user_profile,
            contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
        };
        commentDB.add(comment).then(doc => {
            const postDB = firestore.collection("post");
            const post = getState().post.list.find(list => list.id === post_id);
            const increment = firebase.firestore.FieldValue.increment(1); //increment라는 기능을 사용하면, 안에 들어간 인자만큼 더해준다.
            comment = { ...comment, id: doc.id };
            postDB
                .doc(post_id)
                .update({ comment_cnt: increment })
                .then(_post => {
                    dispatch(addComment(post_id, comment));
                    if (post)
                        dispatch(
                            postActions.editPost(post_id, {
                                comment_cnt: parseInt(post.comment_cnt) + 1, //parseInt로 post.commnet_cnt를 형변환 시키고 +1해준 값을 state에 저장한다.
                            })
                        );

                    //댓글이 추가되면 알람울리기!!!🔔 지금은 동일 인물이여도 알람이 울리지만, 나중에 다른 사람이면 울려주도록 처리해주자!
                    const _noti_item = realtime
                        .ref(`noti/${post.user_info.user_id}/list`)
                        .push();
                    _noti_item.set(
                        {
                            post_id: post.id,
                            user_name: comment.user_name,
                            image_url: post.image_url,
                            insert_dt: comment.insert_dt,
                        },
                        err => {
                            if (err) console.log("알림 저장에 실패했어요!");
                            else {
                                const notiDB = realtime.ref(
                                    `noti/${post.user_info.user_id}`
                                );
                                notiDB.update({ read: false });
                            }
                        }
                    );
                });
        });
    };
};

export default handleActions(
    {
        [GET_COMMENT]: (state, action) =>
            produce(state, draft => {
                draft.list[action.payload.post_id] =
                    action.payload.comment_list;
            }),
        [ADD_COMMENT]: (state, action) =>
            produce(state, draft => {
                draft.list[action.payload.post_id].unshift(
                    action.payload.comment
                );
            }),
        [LOADING]: (state, action) =>
            produce(state, draft => {
                draft.is_loading = action.payload.is_loading;
            }),
    },
    initialState
);

const actionCreators = {
    getCommentFB,
    getComment,
    addComment,
    addCommentFB,
};

export { actionCreators };
