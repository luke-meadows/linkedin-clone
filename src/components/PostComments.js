import { v4 as uuidv4 } from 'uuid';
import '../styles/PostComments.css';
import React from 'react';
import { PostComment } from './PostComment';

export const PostComments = React.memo(({ comments }) => {
  if (comments.length < 1) return <div />;
  return (
    <div className="comments__container">
      {comments.map((comment) => {
        const uuid = uuidv4();
        return <PostComment key={uuid} comment={comment} />;
      })}
    </div>
  );
});
