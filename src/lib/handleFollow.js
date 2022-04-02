import { db } from '../db/firebase';
import firebase from 'firebase';

export const increaseFollowerCount = (otherUserId) => {
  db.collection('users')
    .doc(otherUserId)
    .update({ followerCount: firebase.firestore.FieldValue.increment(1) });
};
export const decreaseFollowerCount = (otherUserId) => {
  db.collection('users')
    .doc(otherUserId)
    .update({ followerCount: firebase.firestore.FieldValue.increment(-1) });
};

export const removeFollowing = (loggedInUserId, otherUserId) => {
  db.collection('following')
    .doc(loggedInUserId)
    .collection('userIds')
    .doc(otherUserId)
    .delete();
};

export const addFollowing = (loggedInUserId, otherUserId) => {
  db.collection('following')
    .doc(loggedInUserId)
    .collection('userIds')
    .doc(otherUserId)
    .set({});
};

export const removeFollower = (loggedInUserId, otherUserId) => {
  db.collection('followers')
    .doc(otherUserId)
    .collection('userIds')
    .doc(loggedInUserId)
    .delete();
};

export const addFollower = (loggedInUserId, otherUserId) => {
  db.collection('followers')
    .doc(otherUserId)
    .collection('userIds')
    .doc(loggedInUserId)
    .set({});
};
