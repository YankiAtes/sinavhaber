// Import the functions you need from the SDKs you need
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
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo9lGR-HEf5z0SHKLfV1XFxZY6NzD_npE",
  authDomain: "sinavhaber-6f8882.firebaseapp.com",
  projectId: "sinavhaber-6f8882",
  storageBucket: "sinavhaber-6f8882.appspot.com",
  messagingSenderId: "202358867428",
  appId: "1:202358867428:web:619275d5230f9f08ef73f1",
  measurementId: "G-R8PBQ3RB0H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

alert(localStorage.getItem("clickedNewsID"));

//NEW
let haberId = localStorage.getItem("clickedNewsID");

//REFERENCE
let newsTitleText = document.getElementById("newTitle");
let backgroundContainer = document.getElementById("background-container");
//DATABASE
async function SetTitle() {
  let ref = doc(db, "news-page", localStorage.getItem("clickedNewsID"));
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    newsTitleText.innerHTML = docSnap.data().title;
  }
}
/*async function setSubTitle() {
  let ref = doc(db, "news-page", localStorage.getItem("clickedNewsID"));
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    console.log(docSnap.data().haberAltBaslikArray);

    for (let i = 0; i < docSnap.data().haberAltBaslikArray.length; i++) {
      const subTitle = document.createElement("p");
      subTitle.className = "new-subtitle";
      subTitle.innerHTML = docSnap.data().haberAltBaslikArray[i];
      backgroundContainer.appendChild(subTitle);
    }
  }
}
async function setText() {
  let ref = doc(db, "news-page", localStorage.getItem("clickedNewsID"));
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    console.log(docSnap.data().haberTextArray);

    for (let i = 0; i < docSnap.data().haberTextArray.length; i++) {
      const text = document.createElement("p");
      text.className = "new-text";
      text.innerHTML = docSnap.data().haberTextArray[i];
      backgroundContainer.appendChild(text);
    }
  }
}*/
async function setSubTitleAndText() {
  let ref = doc(db, "news-page", localStorage.getItem("clickedNewsID"));
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    console.log(docSnap.data().haberAltBaslikArray);
    console.log(docSnap.data().haberTextArray);

    let maxLen = Math.max(
      docSnap.data().haberAltBaslikArray.length,
      docSnap.data().haberTextArray.length
    );

    for (let i = 0; i < maxLen; i++) {
      if (docSnap.data().haberAltBaslikArray[i]) {
        const subTitle = document.createElement("p");
        subTitle.className = "new-subtitle";
        subTitle.innerHTML = docSnap.data().haberAltBaslikArray[i];
        backgroundContainer.appendChild(subTitle);
      }

      if (docSnap.data().haberTextArray[i]) {
        const text = document.createElement("p");
        text.className = "new-text";
        text.innerHTML = docSnap.data().haberTextArray[i];
        backgroundContainer.appendChild(text);
      }
    }
  }
}

SetTitle();
/*setSubTitle();
setText();*/
setSubTitleAndText();
