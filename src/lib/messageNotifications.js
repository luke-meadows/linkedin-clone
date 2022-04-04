import { db } from '../db/firebase';
import firebase from 'firebase';
export function clearNotifications(participantId, loggedInUserId) {
  db.collection('users')
    .doc(loggedInUserId)
    .collection('chats')
    .doc(participantId)
    .update({
      notifications: 0,
    });
}

export function addNotification(participantId, loggedInUserId) {
  db.collection('users')
    .doc(participantId)
    .collection('chats')
    .doc(loggedInUserId)
    .update({ notifications: firebase.firestore.FieldValue.increment(1) });
}
