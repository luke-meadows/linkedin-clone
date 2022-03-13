import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA_YtihJujajMamgbjzy7wvujKWDFQgolE',
  authDomain: 'linkedin-clone-a52af.firebaseapp.com',
  projectId: 'linkedin-clone-a52af',
  storageBucket: 'linkedin-clone-a52af.appspot.com',
  messagingSenderId: '871690900691',
  appId: '1:871690900691:web:fe28bee866d356855db026',
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
