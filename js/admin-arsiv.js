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
  deleteObject,
  listAll,
  list,
  updateMetadata,
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
const selectArsivHaberler2 = document.getElementById("selectArsivHaberler2");
const arsivle = document.getElementById("arsivle");
const sil = document.getElementById("sil");

//Database for Select
const refNewsPage = collection(db, "news-page");

getDocs(refNewsPage).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    //console.log(doc.id);
    let selectOption = document.createElement("option");
    selectOption.innerHTML = doc.data().title;
    selectOption.value = doc.id;
    selectArsivHaberler.appendChild(selectOption);
  });
});

arsivle.addEventListener("click", () => {
  const confirmation = confirm("Haberleri Arşivlemek İstiyor Musunuz?");
  if (confirmation) {
    const selectedOptions = Array.from(selectArsivHaberler.selectedOptions).map(
      (option) => option.value
    );
    //seçilen haberler için foreach döngüsü
    selectedOptions.forEach((opt) => {
      //opt = seçilen haberlerin id'si

      async function addNewsToArchive() {
        let sourceCollection = "news-page";
        let targetCollection = "archive";
        let documentId = opt;

        let sourceDocRef = doc(db, sourceCollection, documentId);

        let sourceDocSnapshot = await getDoc(sourceDocRef);
        let sourceDocData = sourceDocSnapshot.data();

        await deleteDoc(sourceDocRef);

        let targetDocRef = doc(db, targetCollection, documentId);
        await setDoc(targetDocRef, sourceDocData);
      }
      addNewsToArchive();
      alert(opt);
      console.log(opt);
    });
    alert("Haberler Arşivlendi...");
  } else {
    alert("Haberler Arşivlenmedi...");
  }
});

//HABER SİLME SİSTEMİ------------------------------------------------------------------//

/* if (confirmation) {
    const selectedOptions = Array.from(selectArsivHaberler.selectedOptions).map(
      (option) => option.value
    );
    //seçilen haberler için foreach döngüsü
    selectedOptions.forEach((opt) => {
      //opt = seçilen haberlerin id'si

      async function addNewsToArchive() {
        let sourceCollection = "news-page";
        let targetCollection = "archive";
        let documentId = opt;

        let sourceDocRef = doc(db, sourceCollection, documentId);

        let sourceDocSnapshot = await getDoc(sourceDocRef);
        let sourceDocData = sourceDocSnapshot.data();

        await deleteDoc(sourceDocRef);

        let targetDocRef = doc(db, targetCollection, documentId);
        await setDoc(targetDocRef, sourceDocData);
      }
      addNewsToArchive();
      alert(opt);
      console.log(opt);
    });
    alert("Haberler Arşivlendi...");
  }*/
//Database for select(for:delete)
const refArchive = collection(db, "archive");

getDocs(refArchive).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    let selectOption = document.createElement("option");
    selectOption.innerHTML = doc.data().title;
    selectOption.value = doc.id;
    selectArsivHaberler2.appendChild(selectOption);
  });
});

sil.addEventListener("click", () => {
  const confirmation = confirm("Haberleri Silmek İstiyor Musunuz?");
  if (confirmation) {
    const selectedOptions = Array.from(
      selectArsivHaberler2.selectedOptions
    ).map((option) => option.value);
    //seçilen haberler için foreach döngüsü
    selectedOptions.forEach((opt) => {
      //opt = seçilen haberlerin id'si
      async function DeleteNews() {
        let ref = doc(db, "archive", opt);

        await deleteDoc(ref)
          .then(() => {
            console.log("Silinen Haber ID: " + opt);
          })
          .catch((err) => {
            alert("Hata: " + err);
          });
      }
      DeleteNews();
    });
  }
});
