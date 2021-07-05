import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { apikey } from "./firebase";
import { actionCreators as userActions } from "../redux/modules/user";

//컴포넌트
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import { Grid } from "../elements";

function App() {
    const dispatch = useDispatch();

    //우리는 파이어베이스 로그인을 하면 sessionStorage에 인증정보를 담는 방식을 채택했죠!
    //이 sessionStorage에 있는 key 값에는 api키가 포함되어있습니다.
    //그렇다면 이것과 우리의 configstore.js에 있는 apikey가 같다면 로그인인증이 된거죠!
    const _session_key = `firebase:authUser:${apikey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false; //따라서 _session_key가 있으면 로그인인증이 된거죠!

    useEffect(() => {
        if (is_session) dispatch(userActions.loginChekFB());
    });
    return (
        <React.Fragment>
            <Grid>
                <Header />
                {/* ConnectRouter을 써서 리덕스와 같은 history를 사용하도록 합니다. */}
                <ConnectedRouter history={history}>
                    <Route path="/" exact component={PostList} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/signup" exact component={Signup} />
                </ConnectedRouter>
            </Grid>
        </React.Fragment>
    );
}

export default App;
