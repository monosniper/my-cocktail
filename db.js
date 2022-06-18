import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA6qf8uuJy2j_1xMxrg35ApAc3m_Nw1CjM",
    authDomain: "my-cocktail-cd3ce.firebaseapp.com",
    projectId: "my-cocktail-cd3ce",
    storageBucket: "my-cocktail-cd3ce.appspot.com",
    messagingSenderId: "692315460960",
    appId: "1:692315460960:web:8e9c474746c9c12b71ba05"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };