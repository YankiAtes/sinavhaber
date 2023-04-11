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
    measurementId: "G-R8PBQ3RB0H"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();


//UPDATE MAIN NEW IMAGE-------------------------------------------------------------------------------------
const imageInputMainNew = document.getElementById("imageInputMainNew");
const sendMainNew = document.getElementById("sendMainNew");
// Listen for changes to the file input element
imageInputMainNew.addEventListener("change", async (e) => {

    sendMainNew.addEventListener("click", async() =>{
       

        const file = e.target.files[0];
        const reader = new FileReader();
        let ref = doc(db, "main-page","main-new"); //Database + yenilenmek istenen döküman

      
        // Read the contents of the file as a base64-encoded string
        reader.readAsDataURL(file);
        reader.onload = async (event) => {
          const base64String = event.target.result;

          await updateDoc(ref,{
            url:base64String,
          });
          console.log("Document written with ID: ", ref.id);
          //alert("Haber Fotoğrafı Yüklendi");
          
          
        };
    });
 
});
//UPDATE SIDE NEW ---------------------------------------------------------------------------------
const imageInputSideNew = document.getElementById("imageInputSideNew");
const sendSideNew = document.getElementById("sendSideNew");
const textInputSideNew = document.getElementById("textInputSideNew");

// Listen for changes to the file input element
imageInputSideNew.addEventListener("change", async (e) => {

  sendSideNew.addEventListener("click", async() =>{
     

      const file = e.target.files[0];
      const reader = new FileReader();
      let ref = doc(db, "main-page","side-new"); //Database + yenilenmek istenen döküman

    
      // Read the contents of the file as a base64-encoded string
      reader.readAsDataURL(file);
      reader.onload = async (event) => {
        const base64String = event.target.result;

        await updateDoc(ref,{
          url:base64String,
          text:textInputSideNew.value,
        });
        console.log("Document written with ID: ", ref.id);
        //alert("Haber Fotoğrafı Yüklendi");
        
        
      };
  });

});



/*
//GÖSTER
const reveal = document.getElementById("reveal");
async function showImage(){
// Get reference to the image document in Firestore
const imageRef = doc(db, 'main-page', 'main-new');

// Retrieve the image URL from Firestore
const imageSnapshot = await getDoc(imageRef);
const imageUrl =  imageSnapshot.data().url;

// Create a new img element and set the src attribute to the URL
const imgElement = document.createElement('img');
imgElement.src = imageUrl;

// Append the img element to the HTML body
document.body.appendChild(imgElement);
}


reveal.addEventListener("click",showImage);

*/



