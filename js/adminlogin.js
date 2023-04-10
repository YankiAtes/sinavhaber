const loginButton = document.getElementById("login");

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
      
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo9lGR-HEf5z0SHKLfV1XFxZY6NzD_npE",
  authDomain: "sinavhaber-6f8882.firebaseapp.com",
  projectId: "sinavhaber-6f8882",
  storageBucket: "sinavhaber-6f8882.appspot.com",
  messagingSenderId: "202358867428",
  appId: "1:202358867428:web:619275d5230f9f08ef73f1",
  measurementId: "G-R8PBQ3RB0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

async function loginAdmin(){
    //DATABASE
    let ref = doc(db, "admin-login", "XV5OZvgmUQ5ykuILOJdF");
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        let adminUserName =  docSnap.data().username;
         let adminPassword =  docSnap.data().password;
         let username =  document.getElementById("username").value;
        let password =  document.getElementById("password").value;
        if(username == adminUserName && password == adminPassword){
        alert("logging in!!")
        window.location.href ="adminpanel.html";
    }
    else{
        alert("Giriş Bilgileri Hatalı!");
        
    }
    
    //
    
  }
}
loginButton.addEventListener("click",loginAdmin);
