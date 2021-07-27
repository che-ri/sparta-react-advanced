import React from "react";

//elements
import { Grid, Image, Text, Button } from "../elements";

//이미지
import img from "../img_cheri.jpg";

//history
import { history } from "../redux/configureStore";

// PostList에서 각 데이터를 props로 전달해주었죠?! 이제 그것을 post 안에 잘 넣어두기만 하면 됩니다!
const Post = props => {
    return (
        <>
            <Grid bg="#fff" margin="20px 0">
                <Grid is_flex padding="16px">
                    <Grid is_flex width="auto">
                        <Image
                            shape="circle"
                            src={props.user_info.user_profile}
                        />
                        <Text bold>{props.user_info.user_name}</Text>
                    </Grid>
                    <Grid is_flex width="auto">
                        <Text>{props.insert_dt}</Text>
                        {props.is_me && (
                            <Button
                                width="auto"
                                margin="4px"
                                padding="4px"
                                _onClick={() => {
                                    history.push(`/write/${props.id}`);
                                }}
                            >
                                수정
                            </Button>
                        )}
                    </Grid>
                </Grid>
                <Grid padding="16px">
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape="rectangle" src={props.image_url} />
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
    contents: "다들 반가워요! 재미있는 게시글 기대할게요!",
    comment_cnt: 10,
    insert_dt: "2021-07-02 21:19:00",
    is_me: false,
};

export default Post;
