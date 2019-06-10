import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDa9oibBS0ubuxaJV_q75rodfOtDvfZt6k",
    authDomain: "think-piece-ef1dc.firebaseapp.com",
    databaseURL: "https://think-piece-ef1dc.firebaseio.com",
    projectId: "think-piece-ef1dc",
    storageBucket: "think-piece-ef1dc.appspot.com",
    messagingSenderId: "913846331385",
    appId: "1:913846331385:web:80b6b58a9132addd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()

firestore.settings({ timestampsInSnapshots: true });

window.firebase = firebase //hide

export default firebase