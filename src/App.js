import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Feed from './components/Feed';
import NewsWidget from './components/NewsWidget';
import Login from './components/Login';
import { auth } from './db/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../src/features/userSlice';
import { logout } from './features/userSlice';

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

  return (
    <div className="app">
      <Header />
      {!user && <Login />}
      {user && (
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
