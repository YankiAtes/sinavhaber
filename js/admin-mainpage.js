// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

import {
  getFirestore,
  doc,
  getDoc,
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
  storageBucket: "gs://sinavhaber-6f8882.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

//UPDATE MAIN NEW IMAGE-------------------------------------------------------------------------------------
const imageInputMainNew = document.getElementById("imageInputMainNew");
const sendMainNew = document.getElementById("sendMainNew");
// Listen for changes to the file input element
imageInputMainNew.addEventListener("change", async (e) => {
  sendMainNew.addEventListener("click", async () => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let ref = doc(db, "main-page", "main-new"); //Database + yenilenmek istenen döküman

    // Read the contents of the file as a base64-encoded string
    reader.readAsDataURL(file);
    reader.onload = async (event) => {
      const base64String = event.target.result;

      await updateDoc(ref, {
        url: base64String,
      });
      console.log("Document written with ID: ", ref.id);
      //alert("Haber Fotoğrafı Yüklendi");
    };
  });
});
//ANA SAYFA BÜYÜK HABER
let mainNewImageInput = document.getElementById("imageInputMainNew");
mainNewImageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const storageRef = ref(storage, "mainNewImage");
  uploadBytes(storageRef, file);
});

//ANA SAYFA KÜÇÜK HABER
let sideNewImageInput = document.getElementById("imageInputSideNew");
let sideNewTextInput = document.getElementById("textInputSideNew");
let sideNewSendButton = document.getElementById("sendSideNew");

sideNewImageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const storageRef = ref(storage, "sideNewImage");
  uploadBytes(storageRef, file);
});

sideNewSendButton.addEventListener("click", async () => {
  let ref = doc(db, "main-page", "side-new");
  await updateDoc(ref, {
    text: sideNewTextInput.value,
  });
});
