import './styles/App.css';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import { auth } from './db/firebase';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/userSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  // Persist login state
  useEffect(() => {
    auth.onAuthStateChanged((userCredential) => {
      if (userCredential) {
        dispatch(
          login({
            email: userCredential.email,
            uid: userCredential.uid,
            displayName: userCredential.displayName,
            profilePic: userCredential.photoURL || '',
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
      </Routes>
    </div>
  );
}

export default App;
