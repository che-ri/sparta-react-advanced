import React from "react";

//elements
import { Grid, Image, Text } from "../elements";

//이미지
import img from "../img_cheri.jpg";

const Post = props => {
    return (
        <>
            <Grid>
                <Grid is_flex padding="16px">
                    <Grid is_flex width="auto">
                        <Image shape="circle" src={props.src} />
                        <Text bold>{props.user_info.user_name}</Text>
                    </Grid>
                    <Grid is_flex width="auto">
                        <Text>{props.insert_dt}</Text>
                    </Grid>
                </Grid>
                <Grid padding="16px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape="rectangle" src={props.src} />
                </Grid>
                <Grid padding="16px">
                    <Text margin="0px" bold>
                        댓글 {props.comment_cnt}개
                    </Text>
                </Grid>
            </Grid>
        </>
    );
};

Post.defaultProps = {
    user_info: {
        user_name: "cheri",
        user_profile: img,
    },
    image_url: img,
    contents: "피아노는 재미있어요!",
    comment_cnt: 10,
    insert_dt: "2021-07-02 21:19:00",
};

export default Post;
