import { useState } from 'react';
import { auth } from '../db/firebase';
export default function Login({ setLoggedIn }) {
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const user = auth.currentUser;

  function signUp(e) {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setLoggedIn(true);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }
  function login(e) {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(loginDetails.email, loginDetails.password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        setLoggedIn(true);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
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
      <form action="submit" onSubmit={login}>
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
