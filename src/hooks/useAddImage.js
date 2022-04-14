import { useEffect, useState } from 'react';
import '../styles/AddImage.css';
import { auth, db } from '../db/firebase';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { changeBannerImg, changeProfileImg } from '../features/userSlice';

export default function useAddImage(imageToBeUpdated) {
  const [showProfileImageModal, setShowProfileImageModal] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState();

  const firebaseStorageFolders = {
    profile: 'profilePics/',
    banner: 'bannerPics/',
  };
  // Create a preview as a side effect, whenever selected file is changed.
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

  // Update the image state to be passed into upload
  function handleFileChange(e) {
    const [value] = e.target.files;
    setImage(value);
  }

  function closeModal(e) {
    if (e.target.className === 'add__image__outer__modal')
      setShowProfileImageModal(false);
    setImage('');
  }

  async function uploadImage(e) {
    e.preventDefault();
    setLoading(true);
    const user = auth.currentUser;
    // Create a ref and specify which storage directory img should save into
    const task = firebase
      .storage()
      .ref()
      .child(`${firebaseStorageFolders[imageToBeUpdated]}` + user.uid + '.jpg')
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
      if (imageToBeUpdated === 'profile') {
        // Update the userAuth with profile img.
        user.updateProfile({
          photoURL: URL,
        });
        // Update the users collection with profile img.
        db.collection('users').doc(auth.currentUser.uid).set(
          {
            profilePic: URL,
          },
          { merge: true }
        );
        // Update redux state with new img and perform rerender.
        dispatch(changeProfileImg(URL));
      }

      if (imageToBeUpdated === 'banner') {
        // Update the users collection with profile img.
        user.updateProfile({
          bannerImage: URL,
        });
        db.collection('users').doc(auth.currentUser.uid).set(
          {
            bannerImage: URL,
          },
          { merge: true }
        );
        // Update redux state with new img and perform rerender.
        dispatch(changeBannerImg(URL));
      }
      setLoading(false);
      setShowProfileImageModal(false);
    };

    // At different stages of the upload perform separate functions.
    task.on('state_changed', taskInProgress, taskError, taskComplete);
  }

  const ProfileImageModal = () => {
    return (
      <div className="add__image__outer__modal" onClick={closeModal}>
        <div className="add__image__inner__modal">
          <h3>Upload a profile image</h3>
          {/* If loading return loading else return form */}
          {loading ? (
            <p>loading...</p>
          ) : (
            <form>
              {preview && <img className="image__preview" src={preview} />}
              <input
                style={{ display: 'none' }}
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
              />
              <div className="upload__buttons__container">
                <label htmlFor="image" className="file__upload__button">
                  Add Image
                </label>
                <button type="submit" onClick={uploadImage}>
                  Upload
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  };

  // Return logic from hook
  return [setShowProfileImageModal, showProfileImageModal, ProfileImageModal];
}
