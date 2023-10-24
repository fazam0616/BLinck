import { initializeApp } from 'firebase/app';
import { firestore } from 'firebase';

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
    firestore = firebase.firestore();
  }

  firebaseUploadReceipt() {

  }

  firebaseCreateAccount() {

  }

  firebaseUpdateAccount() {

  }

  firebaseCreateWallet() {

  }

  firebaseUpdateWallet() {

  }

  firebaseFetchReceipt() {

  }

  firebaseFetchWallet() {

  }

  firebaseFetchAcctId() { // For grabbing P2P target from Username

  }

  firebaseFetchUser() {
    
  }
}