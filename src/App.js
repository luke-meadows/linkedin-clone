import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Feed from './components/Feed';
import NewsWidget from './components/NewsWidget';
import Login from './components/Login';
import { auth } from './db/firebase';
import { useEffect, useState } from 'react';
function App() {
  const [loggedIn, setLoggedIn] = useState();

  function logout() {
    auth
      .signOut()
      .then(() => {
        console.log('Sign-out successful.');
        setLoggedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="app">
      <Header />
      {!loggedIn && <Login setLoggedIn={setLoggedIn} />}
      {loggedIn && (
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
