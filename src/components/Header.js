import React, { useState, useEffect } from "react";
import { Grid, Text, Button } from "../elements";
import { getCookie, deleteCookie } from "../shared/Cookie";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const Header = props => {
    //useSelector을 이용하면 리덕스에 있는 state를 가져올 수 있었죠!
    const is_login = useSelector(state => state.user.is_login);
    const dispatch = useDispatch();

    //is_login이 true이면 아래와같이 렌더링 될 것 입니다.
    if (is_login) {
        return (
            <React.Fragment>
                <Grid is_flex padding="4px 16px">
                    <Grid>
                        <Text margin="0px" size="24px" bold>
                            헬로
                        </Text>
                    </Grid>

                    <Grid is_flex>
                        <Button text="내정보"></Button>
                        <Button text="알림"></Button>
                        <Button
                            text="로그아웃"
                            _onClick={() => {
                                dispatch(userActions.logOut({}));
                            }}
                        ></Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Grid is_flex padding="4px 16px">
                <Grid>
                    <Text margin="0px" size="24px" bold>
                        헬로
                    </Text>
                </Grid>

                <Grid is_flex>
                    <Button text="로그인"></Button>
                    <Button text="회원가입"></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

Header.defaultProps = {};

export default Header;
