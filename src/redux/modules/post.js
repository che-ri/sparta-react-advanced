import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import img from "../../img_cheri.jpg";
//파이어스토어 사용하기
import { firestore } from "../../shared/firebase";

//action
const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";

//action creators
const setPost = createAction(SET_POST, user => ({ user }));
const addPost = createAction(ADD_POST, user => ({ user }));

//initialState
const initialState = {
    list: [],
};

//게시글 하나에 대한 내용
const initialPost = {
    id: 0,
    user_info: {
        user_name: "cheri",
        user_profile: img,
    },
    image_url: img,
    contents: "피아노는 재미있어요!",
    comment_cnt: 10,
    insert_dt: "2021-07-02 21:19:00",
};

//middleware
const getPostFB = () => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");
        postDB.get().then(docs => {
            docs.forEach(doc => console.log(doc.id, doc.data()));
        });
    };
};

//reducer
export default handleActions(
    {
        [SET_POST]: (state, action) => produce(state, draft => {}),
        [ADD_POST]: (state, action) => produce(state, draft => {}),
    },
    initialState
);

const actionCreators = { setPost, addPost, getPostFB };
export { actionCreators };
