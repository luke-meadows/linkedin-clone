import { Avatar } from '@mui/material';
import React, { useEffect, useState, useMemo } from 'react';
import { calculatePostTime } from '../lib/calculatePostTime';
import { getUser } from '../lib/getUser';
export const PostComment = React.memo(({ comment }) => {
  const [commentOwner, setCommentOwner] = useState('');
  useEffect(() => {
    getUser(comment.owner).then((owner) => {
      setCommentOwner(owner);
    });
  }, []);

  return (
    <div className="comment">
      <div className="comment__header">
        <Avatar />
        <div className="comment__owner">
          <h6> {commentOwner?.firstName + ' ' + commentOwner.lastName}</h6>
          <p>{calculatePostTime(comment.createdAt)}</p>
        </div>
      </div>
      <p className="comment__content">{comment.content}</p>
    </div>
  );
});
