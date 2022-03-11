import '../styles/Feed.css';
import CreatePost from './CreatePost';
import Post from './Post';

export default function Feed() {
  return (
    <div className="feed__container">
      <CreatePost />
      <Post />
    </div>
  );
}
