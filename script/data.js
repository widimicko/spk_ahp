import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs } from "firebase/firestore";

import firebaseConfig from './firebaseConfig.js';


// * Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

const getAllData = async () => {
  let data, documentId;

  // * Get data from Firestore
  const querySnapshot = await getDocs(collection(db, "ahp"));
  querySnapshot.forEach((doc) => {
    documentId = doc.id // 3FlCUN6TjINftU1C87wq
    data = doc.data()
  });

  data.documentId = documentId

  return data
}

export default getAllData
