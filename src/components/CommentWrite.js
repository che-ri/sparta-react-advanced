import React from "react";
import { Grid, Image, Input, Text, Button } from "../elements";

const CommentWrite = () => {
    return (
        <>
            <Grid is_flex padding="16px">
                <Input placeholder="댓글 내용을 입력해주세요!" />
                <Button width="50px" margin="0px 2px">
                    작성
                </Button>
            </Grid>
        </>
    );
};

export default CommentWrite;
