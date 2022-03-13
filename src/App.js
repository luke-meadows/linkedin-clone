import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Feed from './components/Feed';
import NewsWidget from './components/NewsWidget';
import Login from './components/Login';
import { auth } from './db/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login, selectUser } from '../src/features/userSlice';
// import { logout, login, selectUser } from './features/userSlice';
import { useEffect } from 'react';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  function signOut() {
    auth
      .signOut()
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    auth.onAuthStateChanged((userCredential) => {
      if (userCredential) {
        console.log(userCredential.displayName);
        dispatch(
          login({
            email: userCredential.email,
            uid: userCredential.uid,
            displayName: userCredential.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Header />
      {!user && <Login />}
      {user?.email && (
        <div className="app__body">
          <SideBar logout={signOut} />
          <Feed />
          <NewsWidget />
        </div>
      )}
    </div>
  );
}

export default App;
