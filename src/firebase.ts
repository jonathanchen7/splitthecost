import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { SheetData } from "./models/models";

const fire = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const sheetDataConverter = {
  toFirestore(sheetData: SheetData): firebase.firestore.DocumentData {
    return {
      title: sheetData.title,
      entries: sheetData.entries,
      users: sheetData.users,
      numUsers: sheetData.numUsers,
      createdBy: sheetData.createdBy,
      local: sheetData.local,
      id: sheetData.id,
    };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): SheetData {
    const data = snapshot.data(options)!;
    return {
      title: data.title,
      entries: data.entries,
      users: data.users,
      numUsers: data.numUsers,
      createdBy: data.createdBy,
      local: data.local,
      id: data.id,
    };
  },
};

export const auth = fire.auth();
export const db = fire.firestore();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export default fire;
