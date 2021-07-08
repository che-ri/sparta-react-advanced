// PostList.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
//컴포넌트
import Post from "../components/Post";

const PostList = props => {
    const dispatch = useDispatch();
    const post_list = useSelector(state => state.post.list);
    console.log(useSelector(state => state.post));
    useEffect(() => {
        dispatch(postActions.getPostFB());
    }, []);

    return (
        <React.Fragment>
            {/* 기존 state(post_list) 안에 각 딕셔너리들의 데이터를 나열하여 화면에 뿌려줄 것이다! */}
            {post_list.map((post, idx) => {
                // post안의 데이터를 props로 전~부 넘겨주기 위하여 {...post}를 사용합니다!
                return <Post key={post.id} {...post} />;
            })}
        </React.Fragment>
    );
};

export default PostList;
