import '../styles/Post.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/IosShare';
import SendIcon from '@mui/icons-material/Send';
import { Avatar } from '@mui/material';
import { db } from '../db/firebase';
import { useEffect, useState } from 'react';
export default function Post({ text, image, likes, comments, userId }) {
  // Set state for user information to be put onto post
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Fetch the user data (name and profile image) from the user collection using userID
    db.collection('users')
      .where('userId', '==', userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
          console.log(doc.data());
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }, []);

  return (
    <div className="post">
      {!user && (
        <div className="post__header">
          <h6>Loading...</h6>
        </div>
      )}
      {user && (
        <>
          <div className="post__header">
            <Avatar />
            <div className="post__account__info">
              <h6>{user.username}</h6>
              <p>10 followers</p>
              <p>3 mins ago</p>
            </div>
          </div>
          {image && <img className="post__image" src={image} />}

          <p className="post__body">{text}</p>
          <div className="post__interaction">
            <div className="post__likes">
              <ThumbUpIcon />
              <p>{likes}</p>
            </div>
            <div className="post__comments">
              <p>{comments} comments</p>
            </div>
          </div>
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
        </>
      )}
    </div>
  );
}
