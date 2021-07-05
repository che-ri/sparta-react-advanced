import React, { useState } from "react";
import { Grid, Text, Input, Button } from "../elements";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Signup = (props) => {
    const dispatch = useDispatch();

    const signup = () => {
        //예외처리
        if (id === "" || pwd === "" || user_name === "")
            alert("다시 입력해주세요!");
        if (!pwd === pwd_check) return;
        if (pwd === pwd_check)
            dispatch(userActions.signupFB(id, pwd, user_name));
    };

    //state로 값 저장하기
    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwd_check, setPwdCheck] = useState("");
    const [user_name, setUserName] = useState("");

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text size="32px" bold>
                    회원가입
                </Text>

                <Grid padding="16px 0px">
                    <Input
                        label="아이디"
                        placeholder="아이디를 입력해주세요."
                        _onChange={(e) => {
                            setId(e.target.value);
                        }}
                    />
                </Grid>

                <Grid padding="16px 0px">
                    <Input
                        label="닉네임"
                        placeholder="닉네임을 입력해주세요."
                        _onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                </Grid>

                <Grid padding="16px 0px">
                    <Input
                        label="비밀번호"
                        placeholder="비밀번호를 입력해주세요."
                        type="password"
                        _onChange={(e) => {
                            setPwd(e.target.value);
                        }}
                    />
                </Grid>

                <Grid padding="16px 0px">
                    <Input
                        label="비밀번호 확인"
                        placeholder="비밀번호를 다시 입력해주세요."
                        type="password"
                        _onChange={(e) => {
                            setPwdCheck(e.target.value);
                        }}
                    />
                </Grid>

                <Button text="회원가입하기" _onClick={signup}></Button>
            </Grid>
        </React.Fragment>
    );
};

Signup.defaultProps = {};

export default Signup;
