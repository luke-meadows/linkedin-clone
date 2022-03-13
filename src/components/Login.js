import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../db/firebase';
import { login } from '../features/userSlice';

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((userCredential) => {
        userCredential.user
          .updateProfile({
            displayName: loginDetails.email,
          })
          .then(() => {
            dispatch(
              login({
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                displayName: userCredential.user.displayName,
              })
            );
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
      });
  };

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
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  return (
    <div>
      <h1>Sign up</h1>

      <form action="submit" onSubmit={signUp}>
        <input
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
        <button type="submit">submit</button>
      </form>

      <h1>Login</h1>
      <form action="submit" onSubmit={signIn}>
        <input
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
        <button type="submit">submit</button>
      </form>
    </div>
  );
}
