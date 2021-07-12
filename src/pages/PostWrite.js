import React, { useState } from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

const PostWrite = props => {
    const { history } = props;
    const dispatch = useDispatch();
    const [contents, setContents] = useState("");
    const preview = useSelector(state => state.image.preview);

    const changeContents = e => {
        setContents(e.target.value);
    };

    const addPost = () => {
        dispatch(postActions.addPostFB(contents));
    };

    const is_login = useSelector(state => state.user.is_login); //이미 App.js에서 로그인의 조건을 확인하기때문에, 조건을 하나만 확인합니다!
    if (!is_login) {
        return (
            <>
                <Grid margin="100px 0px" padding="16px" center>
                    <Text size="32px" bold>
                        로그인을 하면 글을 작성할 수 있어요!
                    </Text>
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
                <Image
                    shape="rectangle"
                    src={
                        preview ? preview : "http://via.placeholder.com/400x300"
                    }
                />
            </Grid>
            <Grid padding="16px">
                <Input
                    multiLine
                    label="게시글 내용"
                    placeholder="게시글 작성"
                    _onChange={changeContents}
                />
            </Grid>
            <Grid padding="16px">
                <Button _onClick={addPost}>게시글 작성</Button>
            </Grid>
        </>
    );
};

export default PostWrite;
