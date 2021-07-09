import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";
import { useSelector, useDispatch } from "react-redux";

const PostWrite = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const is_login = useSelector(state => state.user.is_login); //이미 App.js에서 로그인의 조건을 확인하기때문에, 조건을 하나만 확인합니다!
    if (!is_login) {
        return (
            <>
                <Grid size="36px" center>
                    <Text>로그인을 하면 글을 작성할 수 있어요!</Text>
                    <Button
                        _onClick={() => {
                            history.replace("/login");
                        }}
                    >
                        로그인하러가기
                    </Button>
                </Grid>
            </>
        );
    }
    return (
        <>
            <Grid padding="16px">
                <Text size="36px" bold>
                    게시글 작성
                </Text>
                <Upload />
            </Grid>
            <Grid>
                <Grid padding="16px">
                    <Text margin="0px" size="24px" bold>
                        미리보기
                    </Text>
                </Grid>
                <Image shape="rectangle" />
            </Grid>
            <Grid padding="16px">
                <Input
                    multiLine
                    label="게시글 내용"
                    placeholder="게시글 작성"
                />
            </Grid>
            <Grid padding="16px">
                <Button>게시글 작성</Button>
            </Grid>
        </>
    );
};

export default PostWrite;
