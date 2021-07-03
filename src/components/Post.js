import React from "react";

//elements
import { Grid, Image, Text } from "../elements";

//이미지
import img from "../img_cheri.jpg";

const Post = props => {
    return (
        <>
            <Grid padding="16px">
                <Grid is_flex>
                    {/* props로 undefinded 값이 내려오면, default로 선언한 값으로 보여진다. null, false는 안된다. */}
                    <Image shape="circle" src={undefined} />
                </Grid>
                <Grid>
                    <Text bold>{props.user_info.user_name}</Text>
                    <Text>{props.user_info.insert_dt}</Text>
                </Grid>
                <Grid padding="16px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid padding="16px">
                    <Text bold>댓글 {props.comment_cnt}개</Text>
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
