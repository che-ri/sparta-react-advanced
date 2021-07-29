import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user"; //user모듈에서 리듀서를 가져옵니다.
import Post from "./modules/post";
import Image from "./modules/image";
import Comment from "./modules/comment";

//history를 만들어서 던져줌
export const history = createBrowserHistory();

//root reducer 만들기
const rootReducer = combineReducers({
    user: User,
    post: Post,
    image: Image,
    comment: Comment,
    //아래와 같이 사용하면 우리의 라우터와 history가 연결이 됩니다. 이렇게 리덕스스토어에 브라우저히스토리를 저장할 수 있다.
    //꼭 리듀서명을 router로 해야합니다!
    router: connectRouter(history),
    //또다른 모듈이 있다면 여기서 쭉쭉 넣어주면 됩니다!
});

//미들웨어 준비 (혹시나, 다른 미들웨어들도 사용하고 싶으면 배열 안에 쏙쏙 넣어주면 됩니다.)
//redux-thunk의 withExtraArgument 기능을 사용하여 history를 넘겨주면 미들웨어가 사용될 때! 즉, 리듀서가 실행되기 전 단계에서 history를 사용할 수 있게 된다.
//그 말 즉은 history를 받아서 .then 을 사용하여 후 처리를 할 수 있겠죠!
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
    //require은 import처럼 패키지를 가져오는 역할을 합니다. 개발환경에서만 사용하기 때문에 따로 패키지를 설치하지않고, require로 가져옵니다.
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

//redux devTools 사용설정
const composeEnhancers =
    //우리가 윈도우인 환경에서만 돌아가기 위한 조건 && 리덕스 데브 툴즈가 설치되어있는지에 대한 조건
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

//미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

//스토어 만들기
//미들웨어랑 루트 리듀서 엮어서 스토어 만들기!
let store = initialStore => createStore(rootReducer, enhancer);

export default store();
