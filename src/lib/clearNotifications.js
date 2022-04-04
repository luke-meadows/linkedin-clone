import { db } from '../db/firebase';

export function clearNotifications(participantId, loggedInUserId) {
  db.collection('users')
    .doc(loggedInUserId)
    .collection('chats')
    .doc(participantId)
    .update({
      notifications: 0,
    });
}
