import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBUtm6fBKeCcwUUnjgFyFKUX5h8LLFkrEo",
    authDomain: "foreixa.firebaseapp.com",
    projectId: "foreixa",
    storageBucket: "foreixa.appspot.com",
    messagingSenderId: "921481894093",
    appId: "1:921481894093:web:63b1ec674f6a5f9f76f184",
    measurementId: "G-YJH9BLZ2JC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;