import { createAction, createActions, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import { storage } from "../../shared/firebase";
import moment from "moment";
import { actionCreators as imageActions } from "./image";

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

const getPost = createAction(GET_POST, (post_list, paging) => ({
    post_list,
    paging,
}));
const addPost = createAction(ADD_POST, post => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
    post_id,
    post,
}));
const loading = createAction(LOADING, is_loading => ({ is_loading }));

const initialState = {
    list: [],
    paging: { start: null, next: null, size: 3 },
    is_loading: false,
};

//FB에서 인피니티 스크롤방식으로 post 정보를 가져옵니다.
const getPostFB = (start = null, size = 3) => {
    return function (dispatch, getState, { history }) {
        //예외처리 : 만약 다음페이지로 불러올 것이 없으면 바로 함수를 끝낸다. 기존 리덕스 스토어에 state를 이용합니다. 왜? 새로고침하면 이 정보들은 필요없는 정보니까!
        let _paging = getState().post.paging;
        if (_paging.start && !_paging.next) {
            alert("그 다음 목록이 없어요!");
            return;
        }

        //가져오기 시작!
        dispatch(loading(true)); //loading 중임을 알려준다.

        //데이터 정렬 및 제한 https://firebase.google.com/docs/firestore/query-data/order-limit-data
        const postDB = firestore.collection("post");
        let query = postDB.orderBy("insert_dt", "desc"); //orderBy에 "desc"을 넣어주면 내림차순으로 정렬된다.
        if (start) query = query.startAt(start); //컴포넌트로부터 start값이 넘어오면 시작점을 지정해준다. 왜? 시작점을 정해주어야, 문서의 몇 번째부터 가져와야되는지 알 수 있겠죠!

        //📌어라 잠깐? 아래의 getPostFB에서는 size보다 항목을 한 개 더 가져와놓고(limit(size+1)) 왜 리덕스스토어에서는 3개만 저장(size:3)하나요?
        //일단 4개를 가져오는 것이 성공이 되면 3개를 리스트를 뿌려주고, 그 다음에 또 가져올 항목이 있다는 것이겠지요
        //위와 같이 다음 항목이 있는지 판별하기 위해 4개를 일단 가져오는 것입니다!
        query
            .limit(size + 1) //항상 size보다 1크게 가져옵니다.
            .get()
            .then(docs => {
                let post_list = [];

                // 새롭게 페이징 정보를 만들어줘요.
                // 시작점에는 새로 가져온 정보의 시작점을 넣고,
                // next에는 마지막 항목을 넣습니다.
                // (이 next가 다음번 리스트 호출 때 start 파라미터로 넘어올거예요.)
                let paging = {
                    start: docs.docs[0], //가져온 문서의 start 지점을 정해줍니다.
                    next:
                        docs.docs.length === size + 1 //가져온 데이터의 길이와 size+1이 같으면, 불러올 데이터 뒤에 데이터가 더 있겠죠!
                            ? docs.docs[docs.docs.length - 1] //true면 next 지점을 선택해주고,
                            : null, //false면 next 지점을 null로 지정합니다.
                    size: size,
                };

                docs.forEach(doc => {
                    if (doc.exists) {
                        //불러온 FB데이터에서 내가 쓸 데이터 솎아내기! 각 딕셔너리의 id와 딕셔너리 내용이 필요하죠!
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
                    } else console.log("No such document!");
                });
                post_list.pop(); //FB에서 4개씩 가져왔으니까 리덕스스토어에 넣기 전에 마지막요소는 지워줘야죠!
                dispatch(getPost(post_list, paging)); //딕셔너리를 잘 정리해서~ 리덕스스토어에 저~장!
            });

        // //FB데이터 불러와서 내가 원하는 형식으로 바꾼뒤에 넣어주는 방법!
        // postDB
        //     .get()
        //     .then(docs => {
        //         let post_list = [];
        //         docs.forEach(doc => {
        //             if (doc.exists) {
        //                 //1.불러온 FB데이터에서 내가 쓸 데이터 솎아내기! 각 딕셔너리의 id와 딕셔너리 내용이 필요하죠!
        //                 const data = { id: doc.id, ...doc.data() }; //스프레드 연산자를 이용하면 doc.data()안에 있는 key:value들이 나열되어 저장됩니다.
        //                 let post = {
        //                     user_info: {
        //                         user_name: data.user_name,
        //                         user_profile: data.user_profile,
        //                         user_id: data.user_id,
        //                     },
        //                     image_url: data.image_url,
        //                     contents: data.contents,
        //                     comment_cnt: data.comment_cnt,
        //                     insert_dt: data.insert_dt,
        //                     id: data.id,
        //                 };
        //                 post_list.push(post);
        //                 //2. 불러온 FB데이터에서 내가 쓸 데이터 솎아내기! (심화)
        //                 // const data = doc.data();
        //                 // let post = Object.keys(data).reduce(
        //                 //     (acc, cur) => {
        //                 //         if (cur.indexOf("user_") !== -1) {
        //                 //             //user_이라는 문자열이 포함이 안되어있으면 -1으로 변하기 때문에, user
        //                 //             return {
        //                 //                 ...acc,
        //                 //                 user_info: {
        //                 //                     ...acc.user_info,
        //                 //                     [cur]: data[cur],
        //                 //                 },
        //                 //             };
        //                 //         }
        //                 //         return { ...acc, [cur]: data[cur] };
        //                 //     },
        //                 //     { id: doc.id, user_info: {} }
        //                 // );
        //                 // post_list.push(post);
        //             } else console.log("No such document!");
        //         });
        //         return dispatch(getPost(post_list)); //딕셔너리를 잘 정리해서~ 리덕스스토어에 저~장!
        //     })
        //     .catch(error => {
        //         console.log("Error getting document:", error);
        //     });
    };
};

const getOnePostFB = id => {
    return function (dispatch, getState, { history }) {
        const postDB = firestore.collection("post");
        postDB
            .doc(id)
            .get()
            .then(doc => {
                let _post = doc.data();
                let post = Object.keys(_post).reduce(
                    (acc, cur) => {
                        if (cur.indexOf("user_") !== -1) {
                            //user_이라는 문자열이 포함이 안되어있으면 -1으로 변하기 때문에, user
                            return {
                                ...acc,
                                user_info: {
                                    ...acc.user_info,
                                    [cur]: _post[cur],
                                },
                            };
                        }
                        return { ...acc, [cur]: _post[cur] };
                    },
                    { id: doc.id, user_info: {} }
                );
                dispatch(getPost([post]));
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

const editPostFB = (post_id = null, post = {}) => {
    return function (dispatch, getState, { history }) {
        if (!post_id) {
            window.alert("게시글 정보가 없어요!");
            return;
        }
        const _image = getState().image.preview;
        const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
        const _post = getState().post.list[_post_idx];

        const postDB = firestore.collection("post");
        //글만 수정되었다면!
        if (_image == _post.image_url)
            postDB
                .doc(post_id)
                .update(post) //문서 일부만 수정할땐 update를 쓰죠!
                .then(doc => {
                    dispatch(editPost(post_id, { ...post }));
                    history.replace("/");
                });
        //이미지가 수정되었다면!
        else {
            const user_id = getState().user.user.uid;
            const _upload = storage
                .ref(`images/${user_id}_${new Date().getTime()}`)
                .putString(_image, "data_url");

            _upload.then(snapshot => {
                snapshot.ref
                    .getDownloadURL()
                    .then(url => {
                        return url;
                    })
                    .then(url => {
                        postDB
                            .doc(post_id)
                            .update({ ...post, image_url: url })
                            .then(doc => {
                                dispatch(
                                    editPost(post_id, {
                                        ...post,
                                        image_url: url,
                                    })
                                );
                                history.replace("/");
                            });
                    })
                    .catch(err => {
                        window.alert("앗! 이미지 업로드에 문제가 있어요!");
                        console.log("앗! 이미지 업로드에 문제가 있어요!", err);
                    });
            });
        }
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
                draft.list.push(...action.payload.post_list);
                draft.list = draft.list.reduce((acc, cur) => {
                    if (acc.findIndex(a => a.id === cur.id) === -1) {
                        return [...acc, cur];
                    } else {
                        acc[acc.findIndex(a => a.id === cur.id)] = cur;
                        return acc;
                    }
                }, []);

                if (action.payload.paging) draft.paging = action.payload.paging;
                draft.is_loading = false;
            }),
        [ADD_POST]: (state, action) =>
            produce(state, draft => {
                draft.list.unshift(action.payload.post);
            }),
        [EDIT_POST]: (state, action) =>
            produce(state, draft => {
                let idx = draft.list.findIndex(
                    p => p.id === action.payload.post_id
                );
                //컨텐츠들이 수정이 될 수도 있고, 아닐 수도 있으니! 일단 그전 것들을 가지고 오고 스프레드 연산자를 통하여 바뀐 부분만 바꿔서 state에 넣어줍니다!
                draft.list[idx] = {
                    ...draft.list[idx],
                    ...action.payload.post,
                };
            }),
        [LOADING]: (state, action) =>
            produce(state, draft => {
                draft.is_loading = action.payload.is_loading;
            }),
    },
    initialState
);

const actionCreators = {
    getPost,
    addPost,
    editPost,
    getPostFB,
    addPostFB,
    editPostFB,
    getOnePostFB,
};

export { actionCreators };
