import '../styles/Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';
import { useEffect, useState } from 'react';
import { calculatePostTime } from '../lib/calculatePostTime';
import { db } from '../db/firebase';
import ScrollContainer from './ScrollContainer';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, setPosts } from '../features/posts';

export default function Feed() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  useEffect(async () => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(15)
      .onSnapshot((dbPosts) => {
        dispatch(setPosts(dbPosts.docs.map((doc) => doc.data())));
      });
  }, []);

  if (!posts) return <h6>loading</h6>;
  return (
    <div className="feed__container">
      <ScrollContainer height={{ height: 'calc(100vh - 96px)' }}>
        <CreatePost withPhoto />
        {posts.map((post, i) => {
          const time = calculatePostTime(post.createdAt);
          return (
            <Post
              key={post.userId + i}
              text={post.content}
              image={post.image || null}
              userId={post.userId}
              likes={post.likeCount}
              comments={post.commentCount}
              time={time}
              postId={post.postId}
            />
          );
        })}
      </ScrollContainer>
    </div>
  );
}
