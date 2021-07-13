import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import { storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";

const getPost = createAction(GET_POST, post_list => ({ post_list }));
const addPost = createAction(ADD_POST, post => ({ post }));

const initialPostList = {
    list: [],
};

//FB에서 post 정보 받아오는 역할을 합니다.
const getPostFB = () => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");
        //FB데이터 불러오기!
        postDB
            .get()
            .then(docs => {
                let post_list = [];
                docs.forEach(doc => {
                    if (doc.exists) {
                        //1.불러온 FB데이터에서 내가 쓸 데이터 솎아내기! 각 딕셔너리의 id와 딕셔너리 내용이 필요하죠!
                        const data = { id: doc.id, ...doc.data() }; //스프레드 연산자를 이용하면 doc.data()안에 있는 key:value들이 나열되어 저장됩니다.
                        let post = {
                            user_info: {
                                user_name: data.user_name,
                                user_profile: data.user_profile,
                                user_id: data.user_id,
                            },
                            image_url: data.image_url,
                            contents: data.contents,
                            comment_cnt: data.comment_cnt,
                            insert_dt: data.insert_dt,
                            id: data.id,
                        };
                        post_list.push(post);
                        //2. 불러온 FB데이터에서 내가 쓸 데이터 솎아내기! (심화)
                        // const data = doc.data();
                        // let post = Object.keys(data).reduce(
                        //     (acc, cur) => {
                        //         if (cur.indexOf("user_") !== -1) {
                        //             //user_이라는 문자열이 포함이 안되어있으면 -1으로 변하기 때문에, user
                        //             return {
                        //                 ...acc,
                        //                 user_info: {
                        //                     ...acc.user_info,
                        //                     [cur]: data[cur],
                        //                 },
                        //             };
                        //         }
                        //         return { ...acc, [cur]: data[cur] };
                        //     },
                        //     { id: doc.id, user_info: {} }
                        // );
                        // post_list.push(post);
                    } else console.log("No such document!");
                });
                return dispatch(getPost(post_list)); //딕셔너리를 잘 정리해서~ 리덕스스토어에 저~장!
            })
            .catch(error => {
                console.log("Error getting document:", error);
            });
    };
};

const addPostFB = (contents = "") => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");
        const _user = getState().user.user;
        const user_info = {
            //기존 유저정보 받아와서 정보 넣어주기!
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        };
        const _post = {
            // post 정보 받아오기
            ...initialPost,
            contents: contents,
            insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"), //지금 날짜 생성
        };

        //문자열에서 업로드 https://firebase.google.com/docs/storage/web/upload-files
        const _image = getState().image.preview; // 이 안에는 원시 문자열이 들어가있으므로, 얘를 data_url로 변환한 후, post와 합칩니다!
        const _upload = storage
            // 파일 이름은 유저의 id와 현재 시간을 밀리초로 넣어줍시다! (혹시라도 중복이 생기지 않도록요!)
            .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
            .putString(_image, "data_url"); //_image라는 원시문자열을 data_url로 변환!

        _upload.then(snapshot => {
            //바꾸고 나서 잘 되었는지 확인해보자!
            snapshot.ref
                .getDownloadURL()
                .then(url => {
                    dispatch(imageActions.uploadImage(url));
                    return url; // 이렇게 url을 리턴해주면 그 다음 then 에서 사용할 수 있습니다!
                })
                .then(url => {
                    postDB
                        .add({ ...user_info, ..._post, image_url: url })
                        .then(doc => {
                            let post = {
                                user_info,
                                ..._post,
                                id: doc.id,
                                image_url: url,
                            };
                            dispatch(addPost(post));
                            dispatch(imageActions.setPreview(null));
                            //imageActions
                            window.alert("작성완료!");
                            history.replace("/");
                        })
                        .catch(err => {
                            window.alert("앗! 포스트 작성에 문제가 있어요!");
                            console.log("post 작성에 실패했어요!", err);
                        });
                })
                .catch(err => {
                    window.alert("이미지 업로드에 문제가 있어요!");
                    console.log(err);
                });
        });
    };
};

const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: "klara",
    //     user_profile:
    //         "https://images.unsplash.com/photo-1625640386828-b1586a3652e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
    // },
    image_url:
        "https://images.unsplash.com/photo-1625640386828-b1586a3652e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
    contents: "Hello, buddy",
    comment_cnt: 0,
    insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"), //지금 날짜 생성! (형식까지 지정)
};

export default handleActions(
    {
        [GET_POST]: (state, action) =>
            //데이터를 리덕스 스토어에 저장!
            produce(state, draft => {
                draft.list = action.payload.post_list;
            }),
        [ADD_POST]: (state, action) =>
            produce(state, draft => {
                draft.list.unshift(action.payload.post);
            }),
    },
    initialPostList
);

const actionCreators = {
    getPost,
    addPost,
    getPostFB,
    addPostFB,
};

export { actionCreators };
