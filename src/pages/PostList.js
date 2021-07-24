// PostList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
//컴포넌트
import Post from "../components/Post";
import InfinityScroll from "../shared/InfinityScroll";

const PostList = props => {
    const dispatch = useDispatch();
    const post_list = useSelector(state => state.post.list);
    const user_info = useSelector(state => state.user.user);
    const { is_loading, paging } = useSelector(state => state.post);
    useEffect(() => {
        if (post_list.length === 0) {
            dispatch(postActions.getPostFB());
        }
    }, []);

    return (
        <React.Fragment>
            {/* 기존 state(post_list) 안에 각 딕셔너리들의 데이터를 나열하여 화면에 뿌려줄 것이다! */}
            <InfinityScroll
                callNext={() => dispatch(postActions.getPostFB(paging.next))}
                is_next={paging.next ? true : false}
                loading={is_loading}
            >
                {post_list.map((post, idx) => {
                    //user_info가 일치하면 is_me라는 props를 넘겨줍니다.
                    if (user_info && post.user_info.user_id === user_info.uid)
                        return <Post key={post.id} {...post} is_me />;
                    // post안의 데이터를 props로 전~부 넘겨주기 위하여 {...post}를 사용합니다!
                    else return <Post key={post.id} {...post} />;
                })}
            </InfinityScroll>
        </React.Fragment>
    );
};

export default PostList;
