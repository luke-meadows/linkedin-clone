import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import Login from '../components/Login';
import { auth } from '../db/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import SidePanel from '../components/SidePanel';
import { Chat } from '../components/Chat';

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
          {/* <div className="side__panel">
            <SideBar logout={signOut} />
            <Chat />
          </div> */}
          <SidePanel>
            <SideBar logout={signOut} />
            <Chat />
          </SidePanel>
          <Feed />
        </div>
      )}
    </div>
  );
}
