import React from "react";
import { Grid, Image, Text } from "../elements";

const CommentList = () => {
    return (
        <>
            <Grid padding="16px">
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
                <CommentItem />
            </Grid>
        </>
    );
};

export default CommentList;

const CommentItem = ({
    user_profile,
    user_name,
    user_id,
    post_id,
    contents,
    insert_dt,
}) => {
    return (
        <>
            <Grid is_flex>
                <Grid is_flex width="auto">
                    <Image shape="circle" />
                    <Text bold>{user_name}</Text>
                </Grid>
                <Grid is_flex margin="0px 4px">
                    <Text margin="0px">{contents}</Text>
                    <Text margin="0px">{insert_dt}</Text>
                </Grid>
            </Grid>
        </>
    );
};

CommentItem.defaultProps = {
    user_profile: "",
    user_name: "cheri",
    user_id: "",
    post_id: 1,
    contents: "너무 좋아요!",
    insert_dt: "2021-01-01 19:00:00",
};
