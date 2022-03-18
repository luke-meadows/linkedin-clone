import '../styles/Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';
import portfolio from '../assets/portfolio.png';
import { useEffect, useState } from 'react';
import { calculatePostTime } from '../lib/calculatePostTime';
import { getFeed } from '../lib/getFeed';

export default function Feed() {
  const [posts, setPosts] = useState();

  useEffect(async () => {
    const feed = await getFeed();
    setPosts(feed);
  }, []);

  if (!posts) return <h6>loading</h6>;
  return (
    <div className="feed__container">
      <CreatePost posts={posts} setPosts={setPosts} />
      {posts.map((post, i) => {
        const time = calculatePostTime(post.createdAt);
        return (
          <Post
            key={post.userId + i}
            text={post.content}
            image={post.content.includes('portfolio' ? portfolio : null)}
            userId={post.userId}
            likes={post.likeCount}
            comments={post.commentCount}
            time={time}
          />
        );
      })}
    </div>
  );
}
