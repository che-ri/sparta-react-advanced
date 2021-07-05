import React from "react";
import { useSelector } from "react-redux";
import { apikey } from "./firebase";

//Permit컴포넌트는 권한컴포넌트로 만들었으며,
//로그인이 되었는지를 확인하고 확인이 되었으면 하위 컴포넌트를 렌더링하는 역할을 한다.
const Permit = props => {
    const is_login = useSelector(state => state.user.is_login);

    const _session_key = `firebase:authUser:${apikey}:[DEFAULT]`;

    const is_session = sessionStorage.getItem(_session_key) ? true : false;

    if (is_session && is_login) {
        return <React.Fragment>{props.children}</React.Fragment>;
    }

    return null;
};

export default Permit;
