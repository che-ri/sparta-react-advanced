import React, { useState } from "react";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Image, Input, Text, Button } from "../elements";

const CommentWrite = ({ post_id }) => {
    const dispatch = useDispatch();
    const [comment_text, setCommetText] = useState("");

    const onChange = e => setCommetText(e.target.value);
    const write = () => {
        dispatch(commentActions.addCommentFB(post_id, comment_text));
        setCommetText("");
    };
    return (
        <>
            <Grid is_flex padding="16px">
                <Input
                    _onChange={onChange}
                    value={comment_text}
                    placeholder="댓글 내용을 입력해주세요!"
                    is_Submit
                    onSubmit={write}
                />
                <Button _onClick={write} width="50px" margin="0px 2px">
                    작성
                </Button>
            </Grid>
        </>
    );
};

export default CommentWrite;
