import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../firebase-config";

//? Manage Users

const userCol = collection(database, "Users");

export const getUserData = async (uid) => {
  const userDoc = doc(userCol, uid);

  const user = await getDoc(userDoc);
  return Promise.resolve(user.data());
};

export const createNewUser = async (user) => {
  const userDoc = doc(userCol, user.uid);

  const isUserExists = await getUserData(user.uid);
  if (!!isUserExists) return;

  const userData = {
    name: user.displayName || auth?.currentUser?.displayName,
    email: user.email,
    userId: user.uid,
  };

  return await setDoc(userDoc, userData);
};

export const updateUser = async (userData) => {
  const userDoc = doc(userCol, userData.userId);

  const newUserData = {
    name: userData.name,
    email: userData.email,
    institue: userData.institue,
  };

  return await updateDoc(userDoc, newUserData);
};
