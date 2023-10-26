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

  app;
  analytics;
  users;
  wallets;
  Genesis;
  
  constructor() {  
    this.app = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.app);
    this.fstore = firebase.firestore();
    this.users = fstore.collection("Users");
    this.wallets = fstore.collection("wallets");
    this.Genesis = fstore.collection("Genesis");
  }

  async firebaseCreateWallet(docId, wallet) {
    const walletRef = this.wallets.doc(docId);
    const walletDoc = await walletRef.get();
    
    if (walletDoc.exists) {
      return walletRef;
    }
    else {
      await this.wallets.doc(docId).set(wallet);
    }
  }
  
  async firebaseCreateAccount(UserId, user) {
    const userRef = this.users.doc(UserId);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return walletRef;
    }
    else {
      await this.users.doc(docId).set(wallet);
    } 
  }

  async firebaseUpdateWallet(wallet, docId) {
    await this.wallet.doc(docId).set(wallet);
  }

  async firebaseUpdateAccount(user, docId) { // Translate wallet array into references.
    await this.users.doc(docId).set(user);
  }

  async firebaseFetchWallet(wallet, docId) {
    await this.wallets.doc(docId).get(); //??? no fucking shot it's this easy. I'm missing something.
    return 
  }

  firebaseFetchAcctId() { // For grabbing P2P target from Username

  }

  firebaseFetchUser() { // TODO: Translate references to wallet array. Figure our, probably a foreach.

  }
}