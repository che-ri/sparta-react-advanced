import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";

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

const initialPost = {
    id: 0,
    user_info: {
        user_name: "klara",
        user_profile:
            "https://images.unsplash.com/photo-1625640386828-b1586a3652e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
    },
    image_url:
        "https://images.unsplash.com/photo-1625640386828-b1586a3652e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
    contents: "Hello, buddy",
    comment_cnt: 0,
    insert_dt: "2021-07-08 23:01:00",
};

export default handleActions(
    {
        [GET_POST]: (state, action) =>
            //데이터를 리덕스 스토어에 저장!
            produce(state, draft => {
                draft.list = action.payload.post_list;
            }),
        [ADD_POST]: (state, action) => produce(state, draft => {}),
    },
    initialPostList
);

const actionCreators = {
    getPost,
    addPost,
    getPostFB,
};

export { actionCreators };
