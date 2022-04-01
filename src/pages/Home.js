import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import { Chat } from '../components/Chat';
import Login from '../components/Login';
import { auth } from '../db/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import DisabledOverlay from '../components/DisabledOverlay';

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
          <div className="side__panel">
            <SideBar logout={signOut} />
            <Chat />
          </div>
          <Feed />
        </div>
      )}
    </div>
  );
}
