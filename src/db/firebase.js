import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA_YtihJujajMamgbjzy7wvujKWDFQgolE',
  authDomain: 'linkedin-clone-a52af.firebaseapp.com',
  projectId: 'linkedin-clone-a52af',
  storageBucket: 'linkedin-clone-a52af.appspot.com',
  messagingSenderId: '871690900691',
  appId: '1:871690900691:web:fe28bee866d356855db026',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
export { db, auth };
