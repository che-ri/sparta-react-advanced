import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { firestore } from "../shared/firebase";

//컴포넌트
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentWrite from "../components/CommentWrite";
import { Grid } from "../elements";

const PostDetail = props => {
    //post불러오기
    const id = props.match.params.id;
    const post_list = useSelector(state => state.post.list);
    const post_idx = post_list.findIndex(p => p.id === id);
    const post_data = post_list[post_idx];
    //is_me를 넣어주기 위해서 필요한 데이터
    const user_info = useSelector(state => state.user.user);

    //파이어베이스에서 불러온 데이터를 담을 저장공간
    const [post, setPost] = useState(post_data ? post_data : null); //리덕스에서 가져온 post_data가 있으면 사용하고, 없으면 null!

    useEffect(() => {
        if (post) return; //만약 post에 데이터가 있으면, 파이어베이스에서 데이터를 가져올 필요가 없으므로 return 한다!

        const postDB = firestore.collection("post");
        postDB
            .doc(id)
            .get()
            .then(doc => {
                let _post = doc.data();
                let post = Object.keys(_post).reduce(
                    (acc, cur) => {
                        if (cur.indexOf("user_") !== -1) {
                            //user_이라는 문자열이 포함이 안되어있으면 -1으로 변하기 때문에, user
                            return {
                                ...acc,
                                user_info: {
                                    ...acc.user_info,
                                    [cur]: _post[cur],
                                },
                            };
                        }
                        return { ...acc, [cur]: _post[cur] };
                    },
                    { id: doc.id, user_info: {} }
                );
                setPost(post);
            });
    }, []);

    return (
        <>
            {/* post에 값이 있으면 렌더링합니다! */}
            {post && (
                <Post
                    {...post}
                    is_me={post.user_info.user_id === user_info.uid}
                />
            )}
            <CommentWrite />
            <CommentList />
        </>
    );
};

export default PostDetail;
