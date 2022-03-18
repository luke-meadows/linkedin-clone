import '../styles/Login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, db } from '../db/firebase';
import { login } from '../features/userSlice';
import { getUser } from '../lib/getUser';
import { getBannerImg } from '../lib/getBannerImg';

export default function Login() {
  const [loginOrSignup, setLoginOrSignup] = useState('login');
  const [error, setError] = useState(null);
  const [loginDetails, setLoginDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  // Sign up
  function signUp(e) {
    e.preventDefault();
    // Create User in Auth
    auth
      .createUserWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: loginDetails.firstName,
        });
        // create user in Firestore
        db.collection('users')
          .doc(auth.currentUser.uid)
          .set({
            firstName: loginDetails.firstName,
            lastName: loginDetails.lastName,
            email: loginDetails.email,
            userId: auth.currentUser.uid,
            username: loginDetails.firstName + ' ' + loginDetails.lastName,
          })
          // Save user info to redux
          .then(() => {
            dispatch(
              login({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: loginDetails.firstName,
              })
            );
          });
      })
      .catch((error) => {
        var errorMessage = error.message;
        setError(errorMessage);
      });
  }

  function signIn(e) {
    e.preventDefault();
    // Log in
    auth
      .signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then(async (userCredential) => {
        // Save user info to redux
        const bannerPic = await getBannerImg(userCredential.user.uid);
        dispatch(
          login({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
            profileImage: userCredential.user.photoURL || null,
            bannerPic: bannerPic || null,
          })
        );
      })
      .catch((error) => {
        var errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <div className="login">
      {loginOrSignup === 'signup' && (
        <>
          <h2 className="login__greeting">Get started</h2>
          <form action="submit" onSubmit={signUp}>
            <input
              className="login__input"
              type="text"
              name="firstName"
              value={loginDetails.firstName}
              placeholder="First name"
              onChange={(e) =>
                setLoginDetails({
                  ...loginDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              className="login__input"
              type="text"
              name="lastName"
              placeholder="Last name"
              value={loginDetails.lastName}
              onChange={(e) =>
                setLoginDetails({
                  ...loginDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              className="login__input"
              type="email"
              name="email"
              value={loginDetails.email}
              onChange={(e) =>
                setLoginDetails({
                  ...loginDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              className="login__input"
              type="password"
              name="password"
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails({
                  ...loginDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <button className="login__button" type="submit">
              Submit
            </button>
          </form>
          {error && <p className="login__error">{error}</p>}
          <p className="signup__invitation">
            Already got an account?{' '}
            <button
              onClick={() => setLoginOrSignup('login')}
              className="signup__button"
            >
              {' '}
              Sign in
            </button>
          </p>
        </>
      )}

      {loginOrSignup === 'login' && (
        <>
          <h2 className="login__greeting">Welcome Back</h2>
          <form action="submit" onSubmit={signIn}>
            <input
              className="login__input"
              type="email"
              name="email"
              placeholder="Email"
              value={loginDetails.email}
              onChange={(e) =>
                setLoginDetails({
                  ...loginDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              className="login__input"
              type="password"
              name="password"
              placeholder="password"
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails({
                  ...loginDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <button className="login__button" type="submit">
              Continue
            </button>
          </form>
          {error && <p className="login__error">{error}</p>}

          <p className="signup__invitation">
            Not got an account?{' '}
            <button
              onClick={() => setLoginOrSignup('signup')}
              className="signup__button"
            >
              {' '}
              Sign up
            </button>
          </p>
        </>
      )}
    </div>
  );
}
