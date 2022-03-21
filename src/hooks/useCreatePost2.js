import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/firebase';
import firebase from 'firebase';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export function useCreatePost(posts, setPosts) {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');

  const uploadPost = async (postData) => {
    setLoading(true);
    await db
      .collection('posts')
      .doc()
      .set({
        likeCount: 0,
        commentCount: 0,
        userId: user.uid,
        content: postData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setPosts([
          {
            likeCount: 0,
            commentCount: 0,
            userId: user.uid,
            content: postData,
            createdAt: {
              seconds: new Date() / 1000,
            },
          },
          ...posts,
        ]);
        setLoading(false);
      });
  };

  async function uploadPostWithImage() {
    setLoading(true);

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
        await uploadPost({
          likeCount: 0,
          commentCount: 0,
          userId: user.uid,
          content: post,
          image: URL,
        }).then(() => {
          setPosts([
            {
              likeCount: 0,
              commentCount: 0,
              userId: user.uid,
              content: post,
              image: URL,
              createdAt: {
                seconds: new Date() / 1000,
              },
            },
            ...posts,
          ]);
          setLoading(false);
        });
      });
    };
    // At different stages of the upload perform separate functions.
    task.on('state_changed', taskInProgress, taskError, taskComplete);
  }
  return {
    uploadPost,
    uploadPostWithImage,
    loading,
    setLoading,
    post,
    setPost,
    image,
    setImage,
  };
}
