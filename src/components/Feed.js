import '../styles/Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';
import { useEffect, useState } from 'react';
import { calculatePostTime } from '../lib/calculatePostTime';
import { db } from '../db/firebase';

export default function Feed() {
  const [posts, setPosts] = useState();

  useEffect(async () => {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(15)
      .onSnapshot((posts) => {
        setPosts(posts.docs.map((doc) => doc.data()));
      });
  }, []);

  if (!posts) return <h6>loading</h6>;
  return (
    <div className="feed__container">
      <CreatePost posts={posts} setPosts={setPosts} withPhoto />
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
    </div>
  );
}
