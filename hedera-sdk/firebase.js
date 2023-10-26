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
      await this.users.doc(docId).set(user);
    } 
  }

  async firebaseUpdateWallet(docId, wallet) {
    await this.wallet.doc(docId).set(wallet);
  }

  async firebaseUpdateAccount(user, docId) { // Translate wallet array into references.
    await this.users.doc(docId).set(user);
  }


  async firebaseFetchWallet(docId) {
    const walletRef = this.wallets.doc(docId);

    // Use getDoc to retrieve the wallet document
    getDoc(walletRef)
    .then((doc) => {
      if (doc.exists()) {
        const walletData = doc.data();
        console.log('Wallet Data:', walletData);
        return doc;
        // Now you can work with the wallet data as a JSON object
      } else {
        console.log('Wallet document does not exist');
      }
    })
    .catch((error) => {
      console.error('Error getting wallet document:', error);
    });
  }


  firebaseFetchAcctIdbyEmail(email) { // For grabbing P2P target from Username
  // Query the collection to find the document with the matching email
  const query = this.users.where('email', '==', email);

  // Execute the query
  return query.get()
    .then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        // No user with the provided email found
        return null;
      } else {
        // Assuming there's only one match, retrieve the accountId
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const accountId = userData.accountId;
        return accountId;
      }
    })
    .catch((error) => {
      console.error('Error querying Firestore:', error);
      throw error;
    });
  }

  firebaseFetchUser(docId) { // TODO: Translate references to wallet array. Figure out, probably a foreach.
    const userRef = this.users.doc(docId);

    // Use getDoc to retrieve the user document
    getDoc(userRef)
    .then((doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        console.log('User Data:', userData);
        // You can work with the user data here or pass it to another function
        return userData;
      } else {
        console.log('User document does not exist');
        // You may want to throw an error or handle the case where the document doesn't exist
        throw new Error('User document does not exist');
      }
    })
    .then((userData) => {
      // You can work with the user data here or pass it to another function
    })
    .catch((error) => {
      console.error('Error getting user document:', error);
    });
  }


}