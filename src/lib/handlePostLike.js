import firebase from 'firebase';
import { db } from '../db/firebase';
import hasUserLikedPost from './hasUserLikedPost';

export default async function handlePostLike(postId, userId) {
  // first need to check if user already liked it
  const hasLiked = await hasUserLikedPost(postId, userId);
  if (hasLiked) {
    unlikePost(postId, userId);
  } else {
    likePost(postId, userId);
  }
}

function likePost(postId, userId) {
  console.log('clickerd');
  db.collection('likes').doc(`${postId}_${userId}`).set({
    userId: userId,
    postId: postId,
  });
  db.collection('posts')
    .doc(postId)
    .update({ likeCount: firebase.firestore.FieldValue.increment(1) });
}

function unlikePost(postId, userId) {
  db.collection('posts')
    .doc(postId)
    .update({ likeCount: firebase.firestore.FieldValue.increment(-1) });

  db.collection('likes').doc(`${postId}_${userId}`).delete();
}
