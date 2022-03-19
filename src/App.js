import './styles/App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import { auth } from './db/firebase';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/userSlice';
import { useEffect } from 'react';
import Login from './components/Login';
import { getUser } from './lib/getUser';

function App() {
  const dispatch = useDispatch();

  // Persist login state
  useEffect(async () => {
    auth.onAuthStateChanged(async (userCredential) => {
      const user = await getUser(userCredential.uid);
      if (userCredential) {
        dispatch(
          login({
            email: userCredential.email,
            uid: userCredential.uid,
            displayName: userCredential.displayName,
            profilePic: userCredential.photoURL || '',
            bannerPic: user.bannerImage || null,
            firstName: user.firstName,
            lastName: user.lastName,
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
