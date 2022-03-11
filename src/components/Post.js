import '../styles/Post.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/IosShare';
import SendIcon from '@mui/icons-material/Send';
import { Avatar } from '@mui/material';

export default function Post({ text, image, video, account, comments }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar />
        <div className="post__account__info">
          <h6>Luke Meadows</h6>
          <p>10 followers</p>
        </div>
      </div>
      {image && <img src={image} />}
      <p>This is a proper sick post mate</p>
      <div className="post__icons">
        <div className="icon__container">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="icon__container">
          <CommentIcon />
          <p>Comment</p>
        </div>
        <div className="icon__container">
          <ShareIcon />
          <p>Share</p>
        </div>
        <div className="icon__container">
          <SendIcon />
          <p>Send</p>
        </div>
      </div>
    </div>
  );
}
