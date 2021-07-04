//액션과 리듀서를 편하게 만들게 도와주는 패키지입니다.
import { createAction, handleActions } from "redux-actions";

//불변성 관리에 사용되는 패키지
import { produce } from "immer";

//함수 가져오기
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// action : 액션 타입 만들기
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// action creators : redux-actions 사용
// createAction(액션타입, (params)=>({return할 내용}))
const logIn = createAction(LOG_IN, user => ({ user }));
const logOut = createAction(LOG_OUT, user => ({ user }));
const getUser = createAction(GET_USER, user => ({ user }));

//initialState
const initialState = {
    user: null,
    is_login: false,
};

//reducer : redux-action과 immer 사용하기
export default handleActions(
    {
        [LOG_IN]: (state, action) =>
            //return 할 내용
            //produce(원본값, 복사한 원본값으로 할 작업)
            produce(state, draft => {
                setCookie("is_login", "success");
                //payload에 우리가 보는 데이터가 담깁니다.
                draft.user = action.payload.user;
                draft.is_login = true;
            }),
        [LOG_OUT]: (state, action) => {},
        [GET_USER]: (state, action) => {},
    },
    initialState
); //initialState자리는 state 초기값입니다.

//action creator export
const actionCreators = { logIn, logOut, getUser };
export { actionCreators };
