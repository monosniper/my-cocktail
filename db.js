import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {enableIndexedDbPersistence} from "@firebase/firestore";
import { collection, onSnapshot, query } from "firebase/firestore";

const firebaseConfig = {

    // measurementId: "G-JHPC7TP12K",

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

// enableIndexedDbPersistence(db)



// const q = query(collection(db, "days"));
// onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
//     snapshot.docChanges().forEach((change) => {
//         if (change.type === "added") {
//             console.log("New city: ", change.doc.data());
//         }
//
//         const source = snapshot.metadata.fromCache ? "local cache" : "server";
//         console.log("Data came from " + source);
//     });
// });

export { auth, db };