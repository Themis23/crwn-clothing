import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider 
} from "firebase/auth";

import {
  getFirestore, 
  doc, 
  getDoc,
  setDoc
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCxgut2B1PUqmSKhNKj8QNvE7K5Ga_cKUY",
  authDomain: "crwn-clothing-db-3dcd2.firebaseapp.com",
  projectId: "crwn-clothing-db-3dcd2",
  storageBucket: "crwn-clothing-db-3dcd2.appspot.com",
  messagingSenderId: "462809263999",
  appId: "1:462809263999:web:d5816094191eb278b8744a"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) =>{
  const userDocRef = doc(db, "users", userAuth.uid)

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    }catch(error){
      console.log("error creating the user", error.message)
    }
  }

  return userDocRef;
}