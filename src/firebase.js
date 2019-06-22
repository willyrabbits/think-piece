import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';

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
export const auth = firebase.auth()

export const provider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => auth.signInWithPopup(provider)
export const signOut = () => auth.signOut()

firestore.settings({ timestampsInSnapshots: true });

window.firebase = firebase //hide

export const createUserProfileDocument = async (user, additionalData) => {
    if (!user) return

    // Get a reference to the place in the database where a user profile might be
    const userRef = firestore.doc(`users/${user.uid}`)

    //Go and fetch the doc from that location
    const snapshot = await userRef.get()

    if (!snapshot.exists) {
        const { displayName, email, photoURL } = user
        const createdAt = new Date()
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.error('Error creating user: ', error.message)
        }
    }

    return getUserDocument(user.uid)
}

export const getUserDocument = async (uid) => {
    if (!uid) return null
    try {
        return firestore.collection('users').doc(uid)
    } catch (error) {
        console.error('Error fetching user: ', error.message)
    }
}

export default firebase