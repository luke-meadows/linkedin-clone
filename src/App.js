import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Feed from './components/Feed';
import NewsWidget from './components/NewsWidget';
import Login from './components/Login';
import { auth } from './db/firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../src/features/userSlice';
function App() {
  const user = useSelector(selectUser);

  function logout() {
    auth
      .signOut()
      .then(() => {
        console.log('Sign-out successful.');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="app">
      <Header />
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <SideBar logout={logout} />
          <Feed />
          <NewsWidget />
        </div>
      )}
    </div>
  );
}

export default App;
