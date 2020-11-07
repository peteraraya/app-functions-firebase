import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBfiFhF89oUs2fkwDny2fN51SHlc2GCa08",
    authDomain: "roles-books.firebaseapp.com",
    databaseURL: "https://roles-books.firebaseio.com",
    projectId: "roles-books",
    storageBucket: "roles-books.appspot.com",
    messagingSenderId: "135340826762",
    appId: "1:135340826762:web:c113281f169359e163cd73"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

export {db ,auth ,firebase ,functions }