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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//PREVIEW
let previewText = document.getElementById("preview");
let refPreview = doc(db, "about-us", "AboutUs");

let docSnap = await getDoc(refPreview);

if (docSnap.exists()) {
  previewText.innerHTML = docSnap.data().aboutUsText;
}

//UPDATE
let btnUpdate = document.getElementById("update");

btnUpdate.addEventListener("click", async () => {
  let ref = doc(db, "about-us", "AboutUs");
  await updateDoc(ref, {
    aboutUsText: previewText.value,
  })
    .then(() => alert("Güncellendi"))
    .catch((err) => alert("Hata:" + err));

  await delay(1000);
  location.reload();
});
