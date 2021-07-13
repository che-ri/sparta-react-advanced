import React, { useState, useEffect } from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import image, { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = props => {
    const dispatch = useDispatch();
    const { history } = props;
    const preview = useSelector(state => state.image.preview);
    const post_list = useSelector(state => state.post.list);

    //수정
    const post_id = props.match.params.id;
    const is_edit = post_id ? true : false;
    let _post = is_edit ? post_list.find(p => p.id === post_id) : null;

    const [contents, setContents] = useState(_post ? _post.contents : "");
    useEffect(() => {
        //Write페이지에서 새로고침하면 리덕스 정보가 날아가므로, 다시 postList 페이지로 전송하여 리덕스 데이터 생성하기
        if (is_edit && !_post) {
            window.alert("포스트 정보가 없어요!");
            history.goBack();
            return;
        }
        if (is_edit) {
            //이전 포스트의 프리뷰 가져오기!
            dispatch(imageActions.setPreview(_post.image_url));
        }
    }, []);

    const changeContents = e => {
        setContents(e.target.value);
    };

    const addPost = () => {
        dispatch(postActions.addPostFB(contents));
    };

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id, { contents }));
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
                    {is_edit ? "게시글 수정" : "게시글 작성"}
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
                    value={contents}
                />
            </Grid>
            <Grid padding="16px">
                {is_edit ? (
                    <Button _onClick={editPost}>게시글 수정</Button>
                ) : (
                    <Button _onClick={addPost}>게시글 작성</Button>
                )}
            </Grid>
        </>
    );
};

export default PostWrite;
