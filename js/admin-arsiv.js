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
const arsivle = document.getElementById("arsivle");

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

arsivle.addEventListener("click", () => {
  const confirmation = confirm("Haberleri Arşivlemek İstiyor Musunuz?");
  if (confirmation) {
    const selectedOptions = Array.from(selectArsivHaberler.selectedOptions).map(
      (option) => option.value
    );
    //seçilen haberler için foreach döngüsü
    selectedOptions.forEach((opt) => {
      //opt = seçilen haberlerin id'si

      /*  async function deleteNews() {
        let ref = doc(db, "news-page", opt);

        let docSnap = await getDoc(ref);
        if (!docSnap.exists()) {
          alert("Document does not exist!");
          return;
        }
        //------------------------------------------
        await deleteDoc(ref).catch((err) => {
          alert("İşlem Başarısız. Hata Kodu:  " + err);
        });
      } */
      async function addNewsToArchive() {
        /*   **ESKİ KOD let** refArchive = collection(db, "archive");
        let refNewsPage = doc(db, "news-page", opt);

        let docSnap = await getDoc(refNewsPage);

        let txtTitle = docSnap.data().title;
        let txtText = docSnap.data().text;

        await deleteDoc(refNewsPage).catch((err) => {
          alert("İşlem Başarısız. Hata Kodu:  " + err);
        });

        const docRef = await addDoc(refArchive, {
          title: txtTitle,
          text: txtText,
        }).catch((err) => {
          alert("İşlem Başarısız Hata Kodu: " + err);
        });

        let archiveID = docRef.id;
        console.log("DOSYANIN ARŞİVDEKİ ID'Sİ: " + archiveID);*/

        let sourceCollection = "news-page";
        let targetCollection = "archive";
        let documentId = opt;

        let sourceDocRef = doc(db, sourceCollection, documentId);

        let sourceDocSnapshot = await getDoc(sourceDocRef);
        let sourceDocData = sourceDocSnapshot.data();

        await deleteDoc(sourceDocRef);

        let targetDocRef = doc(db, targetCollection, documentId);
        await setDoc(targetDocRef, sourceDocData);

        /*let oldArchiveFile = undefined;



        let imageRef = ref(storage, "NewsImages/" + opt);

        let storageRef = ref(storage, "NewsImages/" + opt);

        getDownloadURL(storageRef).then((url) => {
          fetch(url)
            .then((response) => response.blob())
            .then((blob) => {
              let file = new File([blob], "Thumbnail", { type: blob.type });
              oldArchiveFile = file;
            });
        });

         storageRef = ref(storage, "NewsImages/" + archiveID);

        uploadBytes(storageRef, oldArchiveFile)
          .then(() => {
            console.log("ARCHIVE OBJECT UPLOADED TO FIRESTORE STORAGE");
          })
          .catch((err) => {
            alert("HATA: " + err);
          });

        deleteObject(imageRef)
          .then(() => {
            console.log("OBJECT DELETED FROM FIREBASE STORAGE");
          })
          .catch((err) => {
            alert("Hata: " + err);
          });*/
      }
      addNewsToArchive();
      //deleteNews();
      alert(opt);
      console.log(opt);
    });
    alert("Haberler Arşivlendi...");
  } else {
    alert("Haberler Arşivlenmedi...");
  }
});
