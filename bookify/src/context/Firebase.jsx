import { createContext, useContext, useState, useEffect } from "react"
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth"
import { getFirestore, collection, addDoc } from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyDoS0jXbdlNDCQ2u_kyZ23dpTzfjH1s7cE",
    authDomain: "bookify-e3ff0.firebaseapp.com",
    projectId: "bookify-e3ff0",
    storageBucket: "bookify-e3ff0.firebasestorage.app",
    messagingSenderId: "823261143387",
    appId: "1:823261143387:web:7d14acaa579369112d3a7e"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);

const fireStore = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setUser(user);
            else setUser(null);
        })
    }, [])

    const signupUserWithEmailAndPassword = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password)
    const signinUserWithEmailAndPass = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password)
    const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider)
    const handleCreateNewListing = async (name, isbn,price) => {
        await addDoc(collection(fireStore, 'books'), {
            name,
            isbn,
            price,
            userName: user.displayName,
            userId: user.uid,
            userEmail: user.email,
        })
    } 
    const isLoggedIn =user ? true : false;

    return <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, signinUserWithEmailAndPass, signinWithGoogle, handleCreateNewListing, isLoggedIn }}>
        {props.children}
    </FirebaseContext.Provider>
}