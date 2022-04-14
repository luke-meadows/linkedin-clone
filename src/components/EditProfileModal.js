import '../styles/EditProfileModal.css';
import CancelIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateProfileInfo } from '../features/userSlice';
import { useEffect, useState } from 'react';
import { auth, db } from '../db/firebase';

export default function EditProfileModal({ loggedInUser }) {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    firstName: loggedInUser.firstName,
    lastName: loggedInUser.lastName,
    bio: loggedInUser.bio || 'About you...',
    location: loggedInUser.location || 'Where do you live?',
  });

  function handleChange(e) {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function editProfileDetails(e) {
    e.preventDefault();
    const user = auth.currentUser;
    user.updateProfile({
      inputs,
    });
    db.collection('users').doc(user.uid).set(inputs, { merge: true });
    // Update redux state with new img and perform rerender.
    const newUserState = { ...loggedInUser, ...inputs };
    dispatch(updateProfileInfo(newUserState));
  }

  return (
    <div className="edit__profile__modal">
      <div className="inner__edit__profile__modal">
        <div className="content__container">
          <CancelIcon onClick={() => {}} />
          <form action="" onSubmit={editProfileDetails}>
            <label htmlFor="name">First name</label>
            <input
              type="text"
              name="firstName"
              id="name"
              value={inputs.firstName}
              onChange={handleChange}
            />
            <label htmlFor="name">Last name</label>
            <input
              type="text"
              name="lastName"
              id="name"
              value={inputs.lastName}
              onChange={handleChange}
            />
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id=""
              cols="30"
              rows="10"
              value={inputs.bio}
              onChange={handleChange}
            />
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              value={inputs.location}
              onChange={handleChange}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
