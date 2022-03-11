import '../styles/CreatePost.css';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/SlowMotionVideo';
import { Avatar } from '@mui/material';
export default function CreatePost() {
  return (
    <div className="create__post">
      <div className="create__post__top">
        <Avatar />
        <input type="text" placeholder="Start a post" />
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
