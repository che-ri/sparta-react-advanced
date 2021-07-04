import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

//컴포넌트
import PostList from "../pages/PostList";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Header from "../components/Header";
import { Grid } from "../elements";

function App() {
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
