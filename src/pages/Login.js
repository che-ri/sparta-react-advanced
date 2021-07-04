import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import "../shared/Cookie.js";
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie.js";

const Login = props => {
    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const getId = e => {
        setId(e.target.value);
    };
    const getpwd = e => {
        setPwd(e.target.value);
    };
    const login = () => {
        setCookie("user_id", id, 3);
        setCookie("user_pwd", pwd, 3);
        console.log(getCookie("user_id"));
    };

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text size="32px" bold>
                    로그인
                </Text>
                <Grid padding="16px 0px">
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력해주세요."
                        _onChange={getId}
                    />
                </Grid>
                <Grid padding="16px 0px">
                    <Input
                        label="패스워드"
                        placeholder="패스워드 입력해주세요."
                        _onChange={getpwd}
                    />
                </Grid>
                <Button text="로그인하기" _onClick={login}></Button>
            </Grid>
        </React.Fragment>
    );
};

export default Login;
