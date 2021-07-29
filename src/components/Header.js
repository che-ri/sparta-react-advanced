import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { apikey } from "../shared/firebase";
import { realtime } from "../shared/firebase";

//컴포넌트
import { Grid, Text, Button } from "../elements";

const Header = props => {
    //useSelector을 이용하면 리덕스에 있는 state를 가져올&&&& 수 있었죠!
    const dispatch = useDispatch();
    const is_login = useSelector(state => state.user.is_login);
    const user_id = useSelector(state => state.user.user?.uid);
    const [is_read, setIsRead] = useState(true);
    const notiDB = realtime.ref(`noti/${user_id}/`);

    useEffect(() => {
        notiDB.on("value", snapshot => {
            setIsRead(snapshot.val()?.read);
        });
        return () => {
            notiDB.off();
        };
    }, [user_id]);

    const clickNotice = () => {
        history.push("/noti");
        notiDB.update({ read: true });
    };

    //우리는 파이어베이스 로그인을 하면 sessionStorage에 인증정보를 담는 방식을 채택했죠!
    //이 sessionStorage에 있는 key 값에는 api키가 포함되어있습니다.
    //그렇다면 이것과 우리의 configstore.js에 있는 apikey가 같다면 로그인인증이 된거죠!
    const _session_key = `firebase:authUser:${apikey}:[DEFAULT]`;
    const is_session = sessionStorage.getItem(_session_key) ? true : false; //따라서 _session_key가 있으면 로그인인증이 된거죠!

    //is_login(리덕스스토어에 값이 있는지)와 is_session(세션스토리지에 있는 키의 api키가 파이어베이스 api키가 같은지)가 둘다 true이면 헤더가 조건에 따라 렌더링됩니다.
    if (is_login && is_session) {
        return (
            <React.Fragment>
                <Grid is_flex padding="4px 16px">
                    <Grid>
                        <Text margin="0px" size="24px" bold>
                            헬로
                        </Text>
                    </Grid>

                    <Grid is_flex>
                        <Button text="내정보" />
                        {is_read ? (
                            <Button text="알림" _onClick={clickNotice} />
                        ) : (
                            <Button
                                text="알림"
                                bg="tomato"
                                color="black"
                                _onClick={clickNotice}
                            />
                        )}
                        <Button
                            text="로그아웃"
                            _onClick={() => {
                                history.push("/login");
                                dispatch(userActions.logOut());
                            }}
                        />
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
                    <Button
                        text="로그인"
                        _onClick={() => {
                            history.push("/login");
                        }}
                    ></Button>
                    <Button
                        text="회원가입"
                        _onClick={() => {
                            history.push("/signup");
                        }}
                    ></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

Header.defaultProps = {};

export default Header;
