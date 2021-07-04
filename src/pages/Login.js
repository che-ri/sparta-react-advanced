import React from "react";

//리덕스
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user"; //액션생성함수들을 묶어두었던 actionCreators를 불러옵니다.

//컴포넌트
import { Text, Input, Grid, Button } from "../elements";

//함수불러오기
import { getCookie, setCookie, deleteCookie } from "../shared/Cookie.js";

const Login = props => {
    const dispatch = useDispatch();
    const [id, setId] = React.useState("");
    const [pwd, setPwd] = React.useState("");

    const getId = e => {
        setId(e.target.value);
    };
    const getpwd = e => {
        setPwd(e.target.value);
    };
    const login = () => {
        dispatch(userActions.loginAction({ user_id: "cheri" }));
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
                <Button
                    text="로그인하기"
                    _onClick={() => {
                        console.log("로그인했어!");
                        login();
                    }}
                ></Button>
            </Grid>
        </React.Fragment>
    );
};

export default Login;
