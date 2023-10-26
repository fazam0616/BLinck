import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, collection, query, where, QuerySnapshot } from 'firebase/firestore';

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
    this.app = initializeApp(firebaseConfig);
    this.firestore = getFirestore();
    console.log(this.firestore);
    this.users = collection(this.firestore, 'Users');
    this.wallets = collection(this.firestore, 'wallets');
    this.Genesis = collection(this.firestore, 'Genesis');
  }

  async firebaseCreateWallet(docId, wallet) {
    const walletRef = doc(this.wallets, docId);
    const walletDoc = await getDoc(walletRef);
    
    if (walletDoc.exists()) {
      return walletRef;
    } else {
      await setDoc(walletRef, wallet);
    }
  }
  
  async firebaseCreateAccount(UserId, user) {
    const queryRef = query(this.users, where('UserId', '==', UserId));
    const querySnapshot = await getDoc(queryRef);

    if (querySnapshot.size === 0) {
      return null;
    } else {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const accountId = userData.accountId;
      return accountId;
    }
  }

  async firebaseUpdateWallet(docId, wallet) {
    const walletRef = doc(this.wallets, docId);
    await setDoc(walletRef, wallet);
  }

  async firebaseUpdateAccount(user, docId) {
    const userRef = doc(this.users, docId);
    await setDoc(userRef, user);
  }

  async firebaseFetchWallet(docId) {
    const walletRef = doc(this.wallets, docId);

    const walletDoc = await getDoc(walletRef);
    if (walletDoc.exists()) {
      const walletData = walletDoc.data();
      console.log('Wallet Data:', walletData);
      return walletDoc;
    } else {
      console.log('Wallet document does not exist');
    }
  }

  async firebaseFetchAcctIdbyEmail(email) {
    const queryRef = query(this.users, where('email', '==', email));
    const querySnapshot = await getDoc(queryRef);

    if (querySnapshot.size === 0) {
      return null;
    } else {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const accountId = userData.accountId;
      return accountId;
    }
  }

  async firebaseFetchUser(docId) {
    const userRef = doc(this.users, docId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('User Data:', userData);
      return userData;
    } else {
      console.log('User document does not exist');
      throw new Error('User document does not exist');
    }
  }
}

export default FirebaseHandler;
