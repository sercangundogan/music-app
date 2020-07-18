import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"
import "firebase/firestore";
import "firebase/storage"

export const firebaseConfig = {
  apiKey: "AIzaSyAkbo3GxKIlHNXZcacTsKWCrGQT--FlfS8",
  authDomain: "music-app-51739.firebaseapp.com",
  databaseURL: "https://music-app-51739.firebaseio.com",
  projectId: "music-app-51739",
  storageBucket: "music-app-51739.appspot.com",
  messagingSenderId: "1022437929823",
  appId: "1:1022437929823:web:7016ee88b49b4c1c213cea"
};

firebase.initializeApp(firebaseConfig);

export default firebase