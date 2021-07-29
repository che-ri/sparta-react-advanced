import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";
import { Grid, Image, Text } from "../elements";

//PostDetail 컴포넌트에서 post_id 값을 받아올 것입니다.
const CommentList = ({ post_id }) => {
    const dispatch = useDispatch();
    const comment_list = useSelector(state => state.comment.list);
    useEffect(() => {
        //comment_list안에 post_id를 키 값으로 가지고 있는 데이터가 없다면, 댓글을 불러온다. (조금이라도 리소스를 줄이려는 방안)
        if (!comment_list[post_id])
            dispatch(commentActions.getCommentFB(post_id));
    }, []);

    if (!post_id || !comment_list[post_id]) return null; //post_id가 없거나 comment_list에서 불러오지 못한다면 null처리를 해줍니다.
    return (
        <>
            <Grid padding="16px">
                {comment_list[post_id].map(comment => (
                    <CommentItem key={comment.id} {...comment} />
                ))}
            </Grid>
        </>
    );
};

CommentList.defaultProps = {
    post_id: null,
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
