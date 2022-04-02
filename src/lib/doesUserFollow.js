import firebase from 'firebase';
import { db } from '../db/firebase';
export default function doesUserFollow(loggedInUserId, otherUserId) {
  return new Promise((resolve, reject) => {
    var docRef = db
      .collection('following')
      .doc(loggedInUserId)
      .collection('userIds')
      .doc(otherUserId);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(true);
        } else {
          // doc.data() will be undefined in this case
          resolve(false);
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  });
}
