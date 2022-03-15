import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import NewsWidget from '../components/NewsWidget';
import Login from '../components/Login';
import { auth } from '../db/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login, selectUser } from '../features/userSlice';
import { useEffect } from 'react';

export default function Home() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Sign out
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

  return (
    <div>
      {!user && <Login />}
      {user?.email && (
        <div className="app__body home__grid">
          <SideBar logout={signOut} />
          <Feed />
          <NewsWidget />
        </div>
      )}
    </div>
  );
}
