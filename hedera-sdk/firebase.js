import { initializeApp } from 'firebase/app';
import { firestore } from 'firebase';
require("@hashgraph/sdk");


// config:
const firebaseConfig = {
  apiKey: "AIzaSyAJJvxUfAH2Xe7_pbZ9xvUx8WqqpXjlHeQ",
  authDomain: "blinck-e6dcf.firebaseapp.com",
  projectId: "blinck-e6dcf",
  storageBucket: "blinck-e6dcf.appspot.com",
  messagingSenderId: "654694570877",
  appId: "1:654694570877:web:67b9373930557a4e598a14",
  measurementId: "G-GRH3J9CX6M"
};

class FirebaseHandler {
  
  constructor() {  
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    fstore = firebase.firestore();
    const users = fstore.collection("Users");
    const wallets = fstore.collection("wallets");
    const Genesis = fstore.collection("Genesis");
  }

  firebaseCreateAccount(user, docId) {
    this.users.doc(docId).set(user);
  }

  firebaseUpdateAccount(user, docId) {
    this.users.doc(docId).set(user);
  }

  firebaseCreateWallet(wallet, docId) {
    this.wallet.doc(docId).set(wallet);
  }

  firebaseUpdateWallet(wallet, docId) {
    this.wallet.doc(docId).set(wallet);
  }

  firebaseFetchWallet(wallet, docId) {
    this.wallet.doc(docId).set(wallet); //??? no fucking shot it's this easy. I'm missing something.
  }

  firebaseFetchAcctId() { // For grabbing P2P target from Username

  }

  firebaseFetchUser() {

  }
}