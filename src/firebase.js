// ! Connecting Firebase to our React frontend - it's this simple

import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAkEW_U4mqj7MsQY_PRtnzwTeuxyhYvBNM',
  authDomain: 'react--clone-e2344.firebaseapp.com',
  projectId: 'react--clone-e2344',
  storageBucket: 'react--clone-e2344.appspot.com',
  messagingSenderId: '562476881721',
  appId: '1:562476881721:web:ad40bb92fd4c6f7d9bfae8',
  measurementId: 'G-WHBS1VMWRL',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
//* This auth is everything that we need in order to get the authentication login sign in and all
