import '../styles/CreatePost.css';
import ImageIcon from '@mui/icons-material/Image';
import VideoIcon from '@mui/icons-material/SlowMotionVideo';
import { useEffect, useState } from 'react';
import ProfileImage from './ProfileImage';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { uploadPost } from '../lib/uploadPost';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../db/firebase';
import firebase from 'firebase';

export default function CreatePost({ posts, setPosts }) {
  const user = useSelector(selectUser);
  const [post, setPost] = useState('');
  const [image, setImage] = useState('');
  const [showPhotoInput, setShowPhotoInput] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [preview, setPreview] = useState(false);

  async function uploadImage(image) {
    let imgURL;
    // Create a ref and specify which storage directory img should save into
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
      const URL = await task.snapshot.ref.getDownloadURL();
      imgURL = URL;
    };

    // At different stages of the upload perform separate functions.
    task.on('state_changed', taskInProgress, taskError, taskComplete);
    return imgURL;
  }

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    // Free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  function handleFileChange(e) {
    const [value] = e.target.files;
    setImage(value);
  }

  async function handlePostSubmit(e) {
    e.preventDefault();
    const ImgURL = await uploadImage(image);
    const postData = {
      likeCount: 0,
      commentCount: 0,
      userId: user.uid,
      content: post,
      image: ImgURL,
    };
    await uploadPost(postData);
    setPosts([
      {
        ...postData,
        createdAt: {
          seconds: new Date() / 1000,
        },
      },
      ...posts,
    ]);
    setPost('');
  }
  return (
    <div className="create__post">
      <div className="create__post__top">
        <ProfileImage />
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="Start a post"
          />
          {showPhotoInput && (
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
            />
          )}
        </form>
        {preview && (
          <img src={preview} className="create__post__photo__preview" />
        )}
      </div>
      <div className="create__post__bottom">
        <div
          className="post__icon"
          onClick={() => setShowPhotoInput(!showPhotoInput)}
        >
          <ImageIcon style={{ color: '#0a66c2' }} />
          <p>Photo</p>
        </div>
        <div className="post__icon">
          <VideoIcon style={{ color: '#4fa44f' }} />
          <p>Video</p>
        </div>
      </div>
    </div>
  );
}
