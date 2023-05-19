import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDo9lGR-HEf5z0SHKLfV1XFxZY6NzD_npE",
  authDomain: "sinavhaber-6f8882.firebaseapp.com",
  projectId: "sinavhaber-6f8882",
  storageBucket: "sinavhaber-6f8882.appspot.com",
  messagingSenderId: "202358867428",
  appId: "1:202358867428:web:619275d5230f9f08ef73f1",
  measurementId: "G-R8PBQ3RB0H",
  storageBucket: "gs://sinavhaber-6f8882.appspot.com",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

//SHOW AboutUs
let hakkimizda = document.getElementById("hakkimizda");

let docRef = doc(db, "about-us", "AboutUs");

let docSnap = await getDoc(docRef);

hakkimizda.innerHTML = docSnap.data().aboutUsText;
