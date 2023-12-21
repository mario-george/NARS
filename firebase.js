import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD246ETdVHEgVa5SxBFRaELGe11Y0ins2Q",
  authDomain: "projectnars.firebaseapp.com",
  projectId: "projectnars",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export { firebase, db };