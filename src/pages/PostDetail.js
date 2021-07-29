import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

//컴포넌트
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import Permit from "../shared/Permit";

const PostDetail = props => {
    //post불러오기
    const dispatch = useDispatch();
    const id = props.match.params.id; //id는 포스트아이디입니다.
    const post_list = useSelector(state => state.post.list);
    const post_idx = post_list.findIndex(p => p.id === id);
    const post = post_list[post_idx];
    //is_me를 넣어주기 위해서 필요한 데이터
    const user_info = useSelector(state => state.user.user);

    useEffect(() => {
        if (post) return; //만약 post에 데이터가 있으면, 파이어베이스에서 데이터를 가져올 필요가 없으므로 return 한다!
        dispatch(postActions.getOnePostFB(id));
    }, []);

    return (
        <>
            {/* post에 값이 있으면 렌더링합니다! */}
            {post && (
                <Post
                    {...post}
                    is_me={post.user_info.user_id === user_info?.uid}
                />
            )}
            <Permit>
                <CommentWrite post_id={id} />
            </Permit>
            <CommentList post_id={id} />
        </>
    );
};

export default PostDetail;
