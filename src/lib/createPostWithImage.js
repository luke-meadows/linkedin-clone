import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../db/firebase';
import firebase from 'firebase';
import { uploadPost } from './uploadPost';

export async function handleSubmit(e, image, user, post) {
  e.preventDefault();
  const uuid = uuidv4();
  const task = firebase
    .storage()
    .ref()
    .child(`postImages/` + uuid + '.jpg')
    .put(image);
  // While img uploading log its upload progress
  const taskInProgress = (snapshot) => {
    console.log(`transferred: ${snapshot.bytesTransferred}`);
  };
  // If upload errors log the error
  const taskError = (snapshot) => {
    console.log(snapshot);
  };
  // When upload is successful.
  const taskComplete = async () => {
    // Extract the Public URL.
    task.snapshot.ref.getDownloadURL().then(async (URL) => {
      console.log({
        likeCount: 0,
        commentCount: 0,
        userId: user.uid,
        content: post,
        image: URL,
      });
      await uploadPost({
        likeCount: 0,
        commentCount: 0,
        userId: user.uid,
        content: post,
        image: URL,
      });
    });
  };
  // At different stages of the upload perform separate functions.
  task.on('state_changed', taskInProgress, taskError, taskComplete);
}

// SET POST  const postData = {
//     likeCount: 0,
//     commentCount: 0,
//     userId: user.uid,
//     content: post,
//     image: ImgURL,
//   };
//   await uploadPost(postData);
//   setPosts([
//     {
//       ...postData,
//       createdAt: {
//         seconds: new Date() / 1000,
//       },
//     },
//     ...posts,
//   ]);
