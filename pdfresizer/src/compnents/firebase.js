// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp=firebase.initializeApp({
  apiKey: "AIzaSyDflmPKYWxHg-oWucXfl90ivDhGxAEJNAU",
  authDomain: "pdfresizer.firebaseapp.com",
  projectId: "pdfresizer",
  storageBucket: "pdfresizer.appspot.com",
  messagingSenderId: "183954588272",
  appId: "1:183954588272:web:f93c9ad80d26aace856ab5",
  measurementId: "G-RQT6N751MG"
});

// Initialize Firebase
// const db=firebaseApp.firestore();
const auth=firebaseApp.auth();
// const storage=firebaseApp.storage();
// const auth = getAuth(app);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export {auth}