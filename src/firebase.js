import firebase from "firebase/compat/app"; // <- Change this line
import "firebase/compat/firestore";
import "firebase/compat/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAwosNlWiiItXIQug-pvrDMSsnoUcFaio",
  authDomain: "slack-clone-3056f.firebaseapp.com",
  projectId: "slack-clone-3056f",
  storageBucket: "slack-clone-3056f.appspot.com",
  messagingSenderId: "565544564527",
  appId: "1:565544564527:web:807c5cafa9ecb943c3d3da",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };

export default db;

// export default firebase;
