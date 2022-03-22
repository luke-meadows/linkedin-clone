import { db } from '../db/firebase';
import firebase from 'firebase';
import { useState } from 'react';

export default function useAddComment(initialState = '') {
  const [input, setInput] = useState(initialState);

  function handleChange(e) {
    const { value } = e.target;
    setInput(value);
  }
  function handleCommentSubmit(e, postId, loggedInUserId) {
    e.preventDefault();
    // Add comment to comments collection
    db.collection('comments').doc(postId).set({
      content: input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      owner: loggedInUserId,
    });
    // Increment comment count on post
    db.collection('posts')
      .doc(postId)
      .update({ commentCount: firebase.firestore.FieldValue.increment(1) });
  }
  return { handleChange, input, handleCommentSubmit };
}
