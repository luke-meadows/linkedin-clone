import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase';
import { db } from '../db/firebase';

export default function useCreatePost(initialState = {}, setPosts, posts) {
  // first get post data and process it
  const user = useSelector(selectUser);
  const [inputs, setInputs] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState();
  const [createPostModalVisible, setCreatePostModalVisible] = useState(false);
  const initialPostData = {
    likeCount: 0,
    commentCount: 0,
    userId: user.uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    // content: inputs.post,
  };
  // Listen for image and create preview if present
  useEffect(() => {
    if (!inputs.image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(inputs.image);
    setPreview(objectUrl);
    // Free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [inputs.image]);

  function clearForm() {
    setInputs({ post: '', image: '' });
  }

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({ ...inputs, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (inputs.image) {
      // wait for the image upload
      await uploadImage()
        // then upload post with image
        .then(async (URL) => {
          console.log(URL);
          await uploadPostToDb({
            ...initialPostData,
            image: URL,
            content: inputs.post,
          });
        })
        .then(() => {
          setLoading(false);
          clearForm();
          setCreatePostModalVisible(false);
        });
      return;
    } else {
      await uploadPostToDb({
        ...initialPostData,
        content: inputs.post,
      }).then(() => {
        setLoading(false);
        clearForm();
        setCreatePostModalVisible(false);
      });
    }
  }

  function uploadImage() {
    return new Promise((resolve, reject) => {
      const uuid = uuidv4();
      const task = firebase
        .storage()
        .ref()
        .child(`postImages/` + uuid + '.jpg')
        .put(inputs.image);
      const taskInProgress = (snapshot) => {
        console.log(`transferred: ${snapshot.bytesTransferred}`);
      };

      const taskError = (snapshot) => {
        console.log(snapshot);
        reject('rejected');
      };
      const taskComplete = async () => {
        const URL = task.snapshot.ref.getDownloadURL();
        resolve(URL);
      };
      task.on('state_changed', taskInProgress, taskError, taskComplete);
    });
  }

  async function uploadPostToDb(postData) {
    console.log(posts);
    const postRef = db.collection('posts').doc();
    postRef
      .set({
        ...postData,
        postId: postRef.id,
      })
      .then(() => {
        setPosts([
          { ...postData, createdAt: { seconds: Date.now() / 1000 } },
          ...posts,
        ]);
      });
  }

  return {
    inputs,
    handleChange,
    handleSubmit,
    loading,
    preview,
    createPostModalVisible,
    setCreatePostModalVisible,
  };
}
