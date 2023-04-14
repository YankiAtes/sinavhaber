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

const imageInput = document.getElementById("photoUploader1");
const newsTitle = document.getElementById("newsTitleUploader1");
const newsText = document.getElementById("newsTextUploader1");

const sendButton = document.getElementById("upload1");

imageInput.addEventListener("change", async (e) => {
  sendButton.addEventListener("click", async () => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async (event) => {
      const base64String = event.target.result;

      //add doc
      let ref = collection(db, "news-page");

      const docRef = await addDoc(ref, {
        url: base64String,
        title: newsTitle.value,
        text: newsText.value,
      })
        .then(() => alert("İşlem Başarılı"))
        .catch((error) => {
          alert("İşlem Başarısız: ", error);
        });
    };
  });
});
