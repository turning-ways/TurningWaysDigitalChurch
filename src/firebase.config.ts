// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDg90SMSrOxOWeT9BtUQaFVBxUBWREQB4A",
  authDomain: "turning-ways.firebaseapp.com",
  projectId: "turning-ways",
  storageBucket: "turning-ways.appspot.com",
  messagingSenderId: "460926790869",
  appId: "1:460926790869:web:1a1e77955c22ce8a20865c",
  measurementId: "G-2V0X45DQXN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
