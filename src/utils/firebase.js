import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAq3XdJDrvjEBHmIHQ3vzq_mxiQAyfcHIo",
  authDomain: "datn73-uploader.firebaseapp.com",
  projectId: "datn73-uploader",
  storageBucket: "datn73-uploader.appspot.com",
  messagingSenderId: "332027268082",
  appId: "1:332027268082:web:7ebb7e1badca21cf51796b",
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
