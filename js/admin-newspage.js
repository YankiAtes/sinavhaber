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
//Haberler Kısmında Görülecek Yerlerin Yüklenmesi
const imageInput = document.getElementById("photoUploader1");
const newsTitle = document.getElementById("newsTitleUploader1");
const newsText = document.getElementById("newsTextUploader1");

//-------------------------------------------------------------//

const sendButton = document.getElementById("upload1");

//-------------------------------------------------------------//

//HABER EKLEME SİSTEMİ
const haberiDuzenleyinDiv = document.getElementById("haberiDuzenleyinDiv");
const altBaslikEkle = document.getElementById("altBaslikEkle");
const yaziEkle = document.getElementById("yaziEkle");
const fotografEkle = document.getElementById("fotografEkle");
let altBaslikNo = 1;
let haberTextNo = 1;
let haberFotografiNo = 1;

function haberAltBaslikOlustur() {
  const altBaslikText = document.createElement("p");
  altBaslikText.className = "minitext";
  altBaslikText.innerText = "Alt Başlık:" + altBaslikNo;

  haberiDuzenleyinDiv.appendChild(altBaslikText);

  const altBaslikInput = document.createElement("input");
  altBaslikInput.type = "text";
  altBaslikInput.setAttribute("id", "haberAltBaslik" + altBaslikNo);
  altBaslikNo = altBaslikNo + 1;

  haberiDuzenleyinDiv.appendChild(altBaslikInput);

  for (let i = 1; i < altBaslikNo; i++) {
    console.log(i);
  }
}
function haberTextOlustur() {
  const haberTextOlusturText = document.createElement("p");
  haberTextOlusturText.className = "minitext";
  haberTextOlusturText.innerText = "Haber Yazısı " + haberTextNo;

  haberiDuzenleyinDiv.appendChild(haberTextOlusturText);

  const haberTextInput = document.createElement("input");
  haberTextInput.type = "text";
  haberTextInput.id = "haberText" + haberTextNo;
  haberTextNo = haberTextNo + 1;

  haberiDuzenleyinDiv.appendChild(haberTextInput);
}
function haberFotografOlustur() {
  const haberFotografOlusturText = document.createElement("p");
  haberFotografOlusturText.className = "minitext";
  haberFotografOlusturText.innerText = "Haber Fotoğrafı: ";
  haberiDuzenleyinDiv.appendChild(haberFotografOlusturText);

  const haberFotografInput = document.createElement("input");
  haberFotografInput.type = "file";
  haberFotografInput.id = "haberFotografi" + haberFotografiNo;
  haberFotografiNo = haberFotografiNo + 1;

  haberiDuzenleyinDiv.appendChild(haberFotografInput);
}
altBaslikEkle.addEventListener("click", haberAltBaslikOlustur);
yaziEkle.addEventListener("click", haberTextOlustur);
fotografEkle.addEventListener("click", haberFotografOlustur);

//-----------------------------------------------------------//

imageInput.addEventListener("change", async (e) => {
  sendButton.addEventListener("click", async () => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async (event) => {
      const base64String = event.target.result;
      //haber detayı
      let haberAltBaslikArray = [];
      for (let i = 1; i < altBaslikNo; i++) {
        let altBaslikInputArray = document.getElementById("haberAltBaslik" + i);
        haberAltBaslikArray.push(
          /*"HaberAltBaslikInput" + i + */ altBaslikInputArray.value
        );
      }

      let habertextArray = [];
      for (let x = 1; x < haberTextNo; x++) {
        let haberTextInputArray = document.getElementById("haberText" + x);
        habertextArray.push(
          /*"HaberTextInput" + x + */ haberTextInputArray.value
        );
      }

      let haberFotoArray = [];
      for (let y = 1; y < haberFotografiNo; y++) {
        //TODO
        let haberFotoInputArray = document.getElementById("haberFotografi" + y);
        haberFotoArray.push(haberFotoInputArray.value);
      }

      //add doc
      let ref = collection(db, "news-page");

      //--------------------------------------------------------
      const docRef = await addDoc(ref, {
        url: base64String,
        title: newsTitle.value,
        text: newsText.value,
        haberAltBaslikArray: haberAltBaslikArray,
        habertextArray: habertextArray,
        haberFotoArray: haberFotoArray,
      })
        .then(() => alert("İşlem Başarılı"))
        .catch((error) => {
          alert("İşlem Başarısız: ", error);
        });
    };
  });
});
