import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./shared/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

//스토어 경로
import store from "./redux/configureStore";

ReactDOM.render(
    //Provider을 통하여 스토어를 주입합니다.
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
