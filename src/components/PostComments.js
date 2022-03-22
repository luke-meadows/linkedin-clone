import { Avatar } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { calculatePostTime } from '../lib/calculatePostTime';
import '../styles/PostComments.css';
import { getUser } from '../lib/getUser';
import { useEffect, useState } from 'react';

export default function PostComments({ comments }) {
  // destructure comment from object
  const PostComment = ({ comment }) => {
    const [commentOwner, setCommentOwner] = useState('');
    useEffect(async () => {
      const user = await getUser(comment.owner).then((owner) =>
        setCommentOwner(owner)
      );
      return () => user();
    }, []);
    return (
      <div className="comment">
        <div className="comment__header">
          <Avatar />
          <div className="comment__owner">
            <h6>{commentOwner.firstName + ' ' + commentOwner.lastName} </h6>
            <p>{calculatePostTime(comment.createdAt)}</p>
          </div>
        </div>
        <p className="comment__content">{comment.content}</p>
      </div>
    );
  };

  return (
    <div className="comments__container">
      {comments.map((comment) => {
        const uuid = uuidv4();
        return <PostComment key={uuid} comment={comment} />;
      })}
    </div>
  );
}
