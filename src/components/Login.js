import '../styles/Login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth, db } from '../db/firebase';
import { login } from '../features/userSlice';

export default function Login() {
  const [loginOrSignup, setLoginOrSignup] = useState('login');
  const [error, setError] = useState(null);
  const [loginDetails, setLoginDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  function signUp(e) {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: loginDetails.name,
        });
        // create user in firestore
        db.collection('users')
          .doc(auth.currentUser.uid)
          .set({
            name: loginDetails.name,
            email: loginDetails.email,
          })
          .then(() => {
            dispatch(
              login({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName,
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
    auth
      .signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((userCredential) => {
        dispatch(
          login({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
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
              name="name"
              value={loginDetails.name}
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
              submit
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
