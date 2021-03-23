import firebase from 'firebase';


export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: "AIzaSyBUtm6fBKeCcwUUnjgFyFKUX5h8LLFkrEo",
    authDomain: "foreixa.firebaseapp.com",
    projectId: "foreixa",
    storageBucket: "foreixa.appspot.com",
    messagingSenderId: "921481894093",
    appId: "1:921481894093:web:63b1ec674f6a5f9f76f184",
    measurementId: "G-YJH9BLZ2JC"
  });
}
export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token: ', token);
    // return token;

    messaging.onMessage(function(payload){
      console.log('onMessage ', payload)
      // return <Alert severity="info">New Application — check it out!</Alert>
      // console.log("woslet message yaho")
    })
  }
  catch (error) {
    console.error(error);
  }
}