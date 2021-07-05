//액션과 리듀서를 편하게 만들게 도와주는 패키지입니다.
import { createAction, handleActions } from "redux-actions";
//불변성 관리에 사용되는 패키지
import { produce } from "immer";

//함수 가져오기
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

//auth 가져오기
import { auth } from "../../shared/firebase";
import firebase from "firebase/app";

// actions : 액션 타입 만들기
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators : redux-actions 사용
// createAction(액션타입, (params)=>({return할 내용}))
const logOut = createAction(LOG_OUT, user => ({ user }));
const getUser = createAction(GET_USER, user => ({ user }));
const setUser = createAction(SET_USER, user => ({ user }));

// initialState
const initialState = {
    user: null,
    is_login: false,
};

// middleware actions
const loginFB = (id, pwd) => {
    return function (dispatch, getState, { history }) {
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
            res => {
                auth.signInWithEmailAndPassword(id, pwd)
                    .then(user => {
                        console.log(user);

                        dispatch(
                            setUser({
                                user_name: user.user.displayName,
                                id: id,
                                user_profile: "",
                                uid: user.user.uid,
                            })
                        );

                        history.push("/");
                    })
                    .catch(error => {
                        var errorCode = error.code;
                        var errorMessage = error.message;

                        console.log(errorCode, errorMessage);
                    });
            }
        );
    };
};

const signupFB = (id, pwd, user_name) => {
    return function (dispatch, getState, { history }) {
        //비밀번호 기반 회원가입 https://firebase.google.com/docs/auth/web/password-auth?authuser=0
        //email과 password 정보로 가입합니다.
        auth.createUserWithEmailAndPassword(id, pwd)
            .then(user => {
                // 유저 프로필 업데이트 https://firebase.google.com/docs/auth/web/manage-users?authuser=0
                // 우리는 유저네임도 넣어야하기때문에, 가입성공 후 유저네임을 업.데.이.트 하는 방식으로 할 것입니다.
                console.log(user);

                auth.currentUser
                    .updateProfile({
                        displayName: user_name,
                    })
                    .then(() => {
                        dispatch(
                            setUser({
                                user_name: user_name,
                                id: id,
                                user_profile: "",
                                uid: user.user.uid,
                            })
                        );
                        history.push("/");
                    })
                    .catch(error => {
                        console.log(error);
                    });

                // Signed in
                // ...
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode, errorMessage);
                // ..
            });
    };
};

const loginCheckFB = () => {
    return function (dispatch, getState, { history }) {
        auth.onAuthStateChanged(user => {
            if (user) {
                dispatch(
                    setUser({
                        user_name: user.displayName,
                        user_profile: "",
                        id: user.email,
                        uid: user.uid,
                    })
                );
            } else {
                dispatch(logOut());
            }
        });
    };
};

const logoutFB = () => {
    return function (dispatch, getState, { history }) {
        auth.signOut().then(() => {
            dispatch(logOut());
            history.replace("/");
        });
    };
};

// reducer: redux-action과 immer 사용하기
export default handleActions(
    {
        //회원가입과 로그인 둘 다 정보가 set이 되어야 되기때문에 한 번으로 묶는다.
        [SET_USER]: (state, action) =>
            //return 할 내용
            //produce(원본값, 복사한 원본값으로 할 작업)
            produce(state, draft => {
                setCookie("is_login", "success");
                //payload에 우리가 보는 데이터가 담깁니다.
                draft.user = action.payload.user;
                draft.is_login = true;
            }),
        [LOG_OUT]: (state, action) =>
            produce(state, draft => {
                deleteCookie("is_login"); //쿠키를 삭제해봅니다.
                draft.user = null;
                draft.is_login = false;
            }),
        [GET_USER]: (state, action) => produce(state, draft => {}),
    },
    initialState //initialState자리는 state 초기값입니다.
);

// action creator export
const actionCreators = {
    logOut,
    getUser,
    signupFB,
    loginFB,
    loginCheckFB,
    logoutFB,
};

export { actionCreators };
