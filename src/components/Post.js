import React from "react";
import Grid from "../elements/Grid";

//이미지
import img from "../img_cheri.jpg";

const Post = props => {
    return (
        <>
            <Grid padding="16px">
                <div>user profile / user name / insert_dt 추가하기</div>
                <div>contents 내용 </div>
                <div>image 이미지사진</div>
                <div>comment cnt 댓글갯수</div>
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
