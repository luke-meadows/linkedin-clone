import { Avatar } from '@mui/material';
import React from 'react';
import { calculatePostTime } from '../lib/calculatePostTime';
export const PostComment = React.memo(({ comment }) => {
  return (
    <div className="comment">
      <div className="comment__header">
        {comment.owner.profilePic ? (
          <img className="profile-image" src={comment.owner.profilePic} />
        ) : (
          <Avatar />
        )}

        <div className="comment__owner">
          <h6> {comment.owner.displayName}</h6>
          <p>{calculatePostTime(comment.createdAt)}</p>
        </div>
      </div>
      <p className="comment__content">{comment.content}</p>
    </div>
  );
});
