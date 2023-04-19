// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
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
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
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
const storage = getStorage();

//Ana Sayfa Ana Haberi Göster----------------------------------------------------------------------------

async function showMainNewImage() {
  /*const mainNewimageRef = doc(db, "main-page", "main-new");
  const mainNewimageSnapshot = await getDoc(mainNewimageRef);
  const mainNewimageUrl = mainNewimageSnapshot.data().url;
  mainNewIMG.src = mainNewimageUrl;*/
  const mainNewImage = document.getElementById("index-page-main-new-image");
  const storageRef = ref(storage, "mainNewImage");
  getDownloadURL(storageRef).then((url) => {
    mainNewImage.src = url;
  });
}
showMainNewImage();

//Ana Sayfa Yan Haberi Göster----------------------------------------------------------------------------
const sideNewIMG = document.getElementById("index-page-side-new-image");
let sideNewTextElement = document.getElementById("side-new-2-text-id");
async function showSideNewImage() {
  const sideNewRef = doc(db, "main-page", "side-new");
  const sideNewImageSnapshot = await getDoc(sideNewRef);
  const sideNewText = sideNewImageSnapshot.data().text;

  const storageRef = ref(storage, "sideNewImage");
  getDownloadURL(storageRef).then((url) => {
    sideNewIMG.src = url;
  });

  sideNewTextElement.innerText = sideNewText;
}
showSideNewImage();
