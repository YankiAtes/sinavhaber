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
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

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

//Identify components
const selectArsivHaberler = document.getElementById("selectArsivHaberler");
const denemebtn = document.getElementById("goster");

//Database for Select
const docRef = collection(db, "news-page");

getDocs(docRef).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    //console.log(doc.id);
    let selectOption = document.createElement("option");
    selectOption.innerHTML = doc.data().title;
    selectOption.value = doc.id;
    selectArsivHaberler.appendChild(selectOption);
  });
});

denemebtn.addEventListener("click", () => {
  const confirmation = confirm("Haberleri Arşivlemek İstiyor Musunuz?");
  if (confirmation) {
    const selectedOptions = Array.from(selectArsivHaberler.selectedOptions).map(
      (option) => option.value
    );
    //seçilen haberler için foreach döngüsü
    selectedOptions.forEach((opt) => {
      //opt = seçilen haberlerin id'si
      async function deleteNews() {
        let ref = doc(db, "news-page", opt);
        let docSnap = await getDoc(ref);
        if (!docSnap.exists()) {
          alert("Document does not exist!");
          return;
        }

        await deleteDoc(ref).catch((err) => {
          alert("İşlem Başarısız. Hata Kodu:  " + err);
        });
      }
      async function addNewsToArchive() {
        let ref1 = collection(db, "archive");
        let ref2 = doc(db, "news-page", opt);

        let docSnap = await getDoc(ref2);
        const docRef = await addDoc(ref1, {
          title: docSnap.data().title,
          text: docSnap.data().text,
        }).catch((err) => {
          alert("İşlem Başarısız Hata Kodu: " + err);
        });
      }
      addNewsToArchive();
      deleteNews();
      console.log(opt);
    });
    alert("Haberler Arşivlendi...");
  } else {
    alert("Haberler Arşivlenmedi...");
  }
});
