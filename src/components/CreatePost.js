import '../styles/CreatePost.css';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/SlowMotionVideo';
import { Avatar } from '@mui/material';
import { useState } from 'react';
import { db } from '../db/firebase';
import ProfileImage from './ProfileImage';
export default function CreatePost() {
  const [post, setPost] = useState('');
  function handlePostSubmit(e) {
    e.preventDefault();
    console.log('submitted');

    db.collection('posts').add({
      name: 'Luke Meadows',
      body: 'not a test',
    });
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
