
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-analytics.js');

// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyBUtm6fBKeCcwUUnjgFyFKUX5h8LLFkrEo",
    authDomain: "foreixa.firebaseapp.com",
    projectId: "foreixa",
    storageBucket: "foreixa.appspot.com",
    messagingSenderId: "921481894093",
    appId: "1:921481894093:web:63b1ec674f6a5f9f76f184",
    measurementId: "G-YJH9BLZ2JC"
});


firebase.analytics();
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    var notificationTitle = 'Background Message Title';
    var notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
  });


  