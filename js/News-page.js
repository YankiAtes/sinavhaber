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

//create news
let colRef = collection(db, "news-page");
let docsSnap = await getDocs(colRef);
docsSnap.forEach((doc) => {
  console.log(doc.data());
  //create news
  /*createNewElement(
    doc.data().url,
    doc.data().title,
    doc.data().text,
    doc.data().date
  );*/
});

function createNewElement(imageUrl, newTitleDB, newTextDB, newDateDB) {
  // Get the container div
  const container = document.getElementById("container");

  // Create a new div for the news item
  const newsDiv = document.createElement("div");
  newsDiv.className = "news-div-main left";

  // Create the link element for the news item
  const newsLink = document.createElement("a");
  newsLink.href = "Haberler/1/bilimdenhaberler1.html";

  // Create the news image element
  const newsImage = document.createElement("div");
  newsImage.className = "news-image";
  newsLink.appendChild(newsImage);

  // Create the image element
  const newsImageSource = document.createElement("img");
  newsImageSource.src = imageUrl;
  newsImageSource.alt = "";
  newsImageSource.className = "news-image-source";
  newsImage.appendChild(newsImageSource);

  // Create the news title element
  const newsTitle = document.createElement("p");
  newsTitle.className = "news-div-text-title";
  newsTitle.textContent = newTitleDB;
  newsLink.appendChild(newsTitle);

  // Add the link element to the news item div
  newsDiv.appendChild(newsLink);

  // Create the news text element
  const newsText = document.createElement("p");
  newsText.className = "news-div-text";
  newsText.textContent = newTextDB;
  newsDiv.appendChild(newsText);

  // Create the news date element
  const newsDate = document.createElement("p");
  newsDate.className = "news-div-date";
  newsDate.textContent = newDateDB;
  newsDiv.appendChild(newsDate);

  container.appendChild(newsDiv);
}
