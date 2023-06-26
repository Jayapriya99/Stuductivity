import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, database } from "../firebase-config";

const provider = new GoogleAuthProvider();

export const signUpWithEmail = async (
  signUpEmail,
  signUpPassword,
  signUpName
) => {
  return await createUserWithEmailAndPassword(
    auth,
    signUpEmail,
    signUpPassword
  ).then(async (res) => {
    await updateProfile(auth.currentUser, { displayName: signUpName });
    return res;
  });
};

export const signInWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithGoogle = async () => {
  return await signInWithPopup(auth, provider);
};

export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, provider);
};

export const signOut = async () => {
  return await auth.signOut();
};
