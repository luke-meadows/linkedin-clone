import { db } from '../db/firebase';
import firebase from 'firebase';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export default function useAddComment(initialState = '') {
  const [input, setInput] = useState(initialState);

  const user = useSelector(selectUser);

  function handleChange(e) {
    const { value } = e.target;
    setInput(value);
  }

  function clearCommentInput() {
    setInput('');
  }

  function handleCommentSubmit(
    e,
    postId,
    loggedInUserId,
    postComments,
    setPostComments
  ) {
    e.preventDefault();
    // Add comment to comments collection
    const postCommentRef = db
      .collection('comments')
      .doc(postId)
      .collection('postComments');

    // Set the comment in collection
    postCommentRef.doc().set({
      content: input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      owner: loggedInUserId,
    });
    // Increment comment count on post
    db.collection('posts')
      .doc(postId)
      .update({ commentCount: firebase.firestore.FieldValue.increment(1) });

    clearCommentInput();
    // Update comments state with new comment and comment owner info
    setPostComments([
      {
        content: input,
        createdAt: {
          seconds: Date.now() / 1000,
        },
        owner: {
          displayName: `${user.firstName} ${user.lastName}`,
          profilePic: user.profilePic,
        },
      },
      ...postComments,
    ]);
  }
  return { handleChange, input, handleCommentSubmit };
}
