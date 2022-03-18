import '../styles/CreatePost.css';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/SlowMotionVideo';
import { useState } from 'react';
import ProfileImage from './ProfileImage';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { uploadPost } from '../lib/uploadPost';
export default function CreatePost({ posts, setPosts }) {
  const user = useSelector(selectUser);
  const [post, setPost] = useState('');

  async function handlePostSubmit(e) {
    e.preventDefault();
    const postData = {
      likeCount: 0,
      commentCount: 0,
      userId: user.uid,
      content: post,
    };
    await uploadPost(postData);
    setPosts([
      {
        ...postData,
        createdAt: {
          seconds: new Date() / 1000,
        },
      },
      ...posts,
    ]);
    setPost('');
  }
  return (
    <div className="create__post">
      <div className="create__post__top">
        <ProfileImage />
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="Start a post"
          />
        </form>
      </div>
      <div className="create__post__bottom">
        <div className="post__icon">
          <ImageIcon style={{ color: '#0a66c2' }} />
          <p>Photo</p>
        </div>
        <div className="post__icon">
          <VideoIcon style={{ color: '#4fa44f' }} />
          <p>Video</p>
        </div>
      </div>
    </div>
  );
}
