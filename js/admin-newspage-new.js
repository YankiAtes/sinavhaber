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

let createdDocumentsID = undefined;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

//Element Reference
let inputNewTitle = document.getElementById("newsTitleUploader1");
let inputNewText = document.getElementById("newsTextUploader1");
let btnCreateNew = document.getElementById("createNew");

//HABER BAŞLIK VE AÇIKLAMA OLUŞTURULDU
btnCreateNew.addEventListener("click", async () => {
  let ref = collection(db, "news-page");

  try {
    const docRef = await addDoc(ref, {
      title: inputNewTitle.value,
      text: inputNewText.value,
    });

    console.log("Document id: ", docRef.id);
    createdDocumentsID = docRef.id;
    alert("Haber Başarılı Bir Şekilde Oluşturuldu...");
  } catch (error) {
    alert("Hata! :" + error);
  }
});

//-------------------------------------------------------------------------------------------------

//Thumbnail'i cloud storage'a yükleme
let inputMainPhoto = document.getElementById("photoUploader1");
let btnUploadPhoto = document.getElementById("btnUploadPhoto");
inputMainPhoto.addEventListener("change", (event) => {
  btnUploadPhoto.addEventListener("click", async () => {
    let file = event.target.files[0];
    const storageRef = ref(
      storage,
      "NewsImages/" + (createdDocumentsID + "/") + "Thumbnail"
    );
    uploadBytes(storageRef, file).then(() => {
      alert("Kapak Fotoğrafı Başarılı Bir Şekilde Yüklendi...");
    });
  });
});

//--------------------------------------HABER DÜZENLEME SİSTEMİ-----------------------------------------------------------

const haberiDuzenleyinDiv = document.getElementById("haberiDuzenleyinDiv");
const haberDetayKalibiOlustur = document.getElementById("haberKalipEkle");
const altBaslikEkle = document.getElementById("altBaslikEkle");
const yaziEkle = document.getElementById("yaziEkle");
const fotografEkle = document.getElementById("fotografEkle");
let altBaslikNo = 1;
let haberTextNo = 1;
let haberFotografiNo = 1;

haberDetayKalibiOlustur.addEventListener("click", async () => {
  //ALT BAŞLIK
  const altBaslikText = document.createElement("p");
  altBaslikText.className = "minitext2";
  altBaslikText.innerText = "Alt Başlık " + altBaslikNo + ":";

  haberiDuzenleyinDiv.appendChild(altBaslikText);

  const altBaslikInput = document.createElement("input");
  altBaslikInput.type = "text";
  altBaslikInput.setAttribute("id", "haberAltBaslik" + altBaslikNo);
  altBaslikInput.className = "haberDetayInputJS";
  altBaslikNo = altBaslikNo + 1;

  haberiDuzenleyinDiv.appendChild(altBaslikInput);
  //----------------------------------------------------------------------

  //TEXT
  const haberTextOlusturText = document.createElement("p");
  haberTextOlusturText.className = "minitext2";

  haberTextOlusturText.innerText = "Haber Yazısı " + haberTextNo;

  haberiDuzenleyinDiv.appendChild(haberTextOlusturText);

  const haberTextInput = document.createElement("input");
  haberTextInput.type = "text";
  haberTextInput.id = "haberText" + haberTextNo;
  haberTextInput.className = "haberDetayInputJS";
  haberTextNo = haberTextNo + 1;

  haberiDuzenleyinDiv.appendChild(haberTextInput);
  //----------------------------------------------------------------------

  //FOTOGRAF
  const haberFotografOlusturText = document.createElement("p");
  haberFotografOlusturText.className = "minitext2";
  haberFotografOlusturText.innerText =
    "Haber Fotoğrafı " + haberFotografiNo + ":";
  haberiDuzenleyinDiv.appendChild(haberFotografOlusturText);

  const haberFotografInput = document.createElement("input");
  haberFotografInput.type = "file";
  haberFotografInput.id = "haberFotografi" + haberFotografiNo;
  haberFotografiNo = haberFotografiNo + 1;

  haberiDuzenleyinDiv.appendChild(haberFotografInput);

  haberFotografInput.addEventListener("change", (event) => {
    uploadButton.addEventListener("click", () => {
      //DETAY FOTOGRAFI
      for (let i = 1; i <= haberFotografiNo; i++) {
        let fileInput = document.getElementById(
          "haberFotografi" + i // Use i instead of haberFotografiNo
        );
        let file = fileInput.files[0]; // Use fileInput instead of event.target
        const storageRef = ref(
          storage,
          "NewsImages/" + createdDocumentsID + "/" + "array/" + i // Use i instead of haberFotografiNo
        );

        uploadBytes(storageRef, file).then(() => {
          console.log("FILE UPLOAD TO FIREBASE 9 STORAGE");
        });
      }
    });
  });

  //----------------------------------------------------------------------
});

/*function haberAltBaslikOlustur() {
  const altBaslikText = document.createElement("p");
  altBaslikText.className = "minitext2";
  altBaslikText.innerText = "Alt Başlık " + altBaslikNo + ":";

  haberiDuzenleyinDiv.appendChild(altBaslikText);

  const altBaslikInput = document.createElement("input");
  altBaslikInput.type = "text";
  altBaslikInput.setAttribute("id", "haberAltBaslik" + altBaslikNo);
  altBaslikInput.className = "haberDetayInputJS";
  altBaslikNo = altBaslikNo + 1;

  haberiDuzenleyinDiv.appendChild(altBaslikInput);
}
function haberTextOlustur() {
  const haberTextOlusturText = document.createElement("p");
  haberTextOlusturText.className = "minitext2";

  haberTextOlusturText.innerText = "Haber Yazısı " + haberTextNo;

  haberiDuzenleyinDiv.appendChild(haberTextOlusturText);

  const haberTextInput = document.createElement("input");
  haberTextInput.type = "text";
  haberTextInput.id = "haberText" + haberTextNo;
  haberTextInput.className = "haberDetayInputJS";
  haberTextNo = haberTextNo + 1;

  haberiDuzenleyinDiv.appendChild(haberTextInput);
}
function haberFotografOlustur() {
  const haberFotografOlusturText = document.createElement("p");
  haberFotografOlusturText.className = "minitext2";
  haberFotografOlusturText.innerText =
    "Haber Fotoğrafı " + haberFotografiNo + ":";
  haberiDuzenleyinDiv.appendChild(haberFotografOlusturText);

  const haberFotografInput = document.createElement("input");
  haberFotografInput.type = "file";
  haberFotografInput.id = "haberFotografi" + haberFotografiNo;
  haberFotografiNo = haberFotografiNo + 1;

  haberiDuzenleyinDiv.appendChild(haberFotografInput);
}
altBaslikEkle.addEventListener("click", haberAltBaslikOlustur);
yaziEkle.addEventListener("click", haberTextOlustur);
fotografEkle.addEventListener("click", haberFotografOlustur);*/

const uploadButton = document.getElementById("upload1");
let haberAltBaslikArray = [];
let haberTextArray = [];

uploadButton.addEventListener("click", () => {
  for (let i = 1; i < altBaslikNo; i++) {
    let altBaslikInputArray = document.getElementById("haberAltBaslik" + i);
    haberAltBaslikArray.push(altBaslikInputArray.value);
    haberTextArray.push();
  }
  for (let i = 1; i < haberTextNo; i++) {
    let textInputArray = document.getElementById("haberText" + i);
    haberTextArray.push(textInputArray.value);
    haberAltBaslikArray.push();
    //console.log(haberAltBaslikArray[i - 1]);
  }
  async function updateDocFields() {
    let ref = doc(db, "news-page", createdDocumentsID);
    await updateDoc(ref, {
      haberAltBaslikArray: haberAltBaslikArray,
      haberTextArray: haberTextArray,
    });
  }

  updateDocFields();
});
