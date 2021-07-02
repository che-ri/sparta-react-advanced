import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

//pages
import PostList from "../pages/PostList";

//css
import "./App.css";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" exact component={PostList} />
                    <Redirect path="*" to="/" />
                </Switch>
            </Router>
        </>
    );
}

export default App;
