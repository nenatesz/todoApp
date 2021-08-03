require("firebase/auth");
const admin = require('firebase-admin');
const firebase = require('firebase')
const serviceAccount = require('../todoapp-86b22-firebase-adminsdk-c2yug-25a80f514f');



const firebaseConfig = {
    apiKey: "AIzaSyAk6JtPbMuvxMF856goAR_IBaUUB3ppnhU",
    authDomain: "todoapp-86b22.firebaseapp.com",
    projectId: "todoapp-86b22",
    storageBucket: "todoapp-86b22.appspot.com",
    messagingSenderId: "840141407308",
    appId: "1:840141407308:web:6c7f894d0d5fe7df2ae0e9",
    measurementId: "G-FVB1HFFPS6"
  };


firebase.initializeApp(firebaseConfig)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });


// Admin functions

const db = admin.firestore();
const admin_auth = admin.auth();

// firebase functions
const firebase_auth = firebase.auth();


//FIREBASE STOREGE ///
// const bucket = admin.storage().bucket();


module.exports = {db, admin_auth, firebase_auth}