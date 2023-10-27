import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, getDocs, collection, query, where, QuerySnapshot } from 'firebase/firestore';

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
    this.fstore = getFirestore(); // Confirmed to be working.
	console.log(typeof this.fstore);
    this.users = collection(this.fstore, 'Users');
    this.wallets = collection(this.fstore, 'wallets');
    this.Genesis = collection(this.fstore, 'Genesis');
  }


  async firebaseCreateWallet(docId, wallet) {
    const walletRef = doc(this.wallets, docId);
	console.log("\n\nin firebaseCreateWallet, parameters are:" + docId + " " + walletRef.path);
    const walletDoc = await getDoc(walletRef);
	
    if (walletDoc.exists()) {
      return walletRef.path;
    } else {
	  const dcock = doc(this.fstore, "wallets", docId); 
      await setDoc(dcock, JSON.parse(wallet));
	  return walletRef.path
    }
  }
  
  
  async firebaseCreateAccount(docId, user) {
    const userRef = doc(this.users, docId);
	console.log("\n\nIn firebaseCreateAccount: "+docId+"\n\n\n"+userRef);
	console.log("\nWallet creation debug:"+typeof userRef);
    const userDoc = await getDoc(userRef);
	
    if (userDoc.exists()) {
      return walletRef;
    } else {
	  const dcock = doc(this.fstore, "Users", docId); 
      await setDoc(dcock, JSON.parse(user));
    }
  }

  async firebaseUpdateWallet(docId, wallet) {
    const walletRef = doc(this.wallets, docId);
	const dcock = doc(this.fstore, "wallets", docId);
    await setDoc(dcock, JSON.parse(wallet));
  }

  async firebaseUpdateAccount(user, docId) {
	 console.log("in firebaseUpdateAccount, parameters are:" + user + docId);
	  
     const dcock = doc(this.fstore, "Users", docId); 
     await setDoc(dcock, JSON.parse(user));
  }

  async firebaseFetchWallet(docId) {
    const walletRef = doc(this.wallets, docId);

    const walletDoc = await getDoc(walletRef);
    if (walletDoc.exists()) {
      const walletData = walletDoc.data();
      console.log('Wallet Data:', walletData);
      return walletDoc.data;
    } else {
      console.log('Wallet document does not exist');
    }
  }
  
  async getDocumentAtPath(path) {
	const documentRef = doc(this.fstore, path);
	const documentSnapshot = await getDoc(documentRef);
  
	if (documentSnapshot.exists()) {
		return documentSnapshot.data();
	} else {
		console.log('Document does not exist');
		return null;
	}
  }

  async firebaseFetchAcctIdbyEmail(email) {
    const queryRef = query(this.users, where('email', '==', email));
    const querySnapshot = await getDocs(queryRef);

    if (querySnapshot.size === 0) {
      return null;
    } else {
      const userData = querySnapshot.docs[0].data();
	  const walletPaths = userData.wallets;

	  if (walletPaths.length > 0) {
      // Assuming walletPaths is an array of document paths.
		const firstWalletPath = walletPaths[0];
		console.log("\nWallet path:" + firstWalletPath);
      
		// Retrieve the document at the firstWalletPath and return its accountId.
		const walletDocRef = doc(this.fstore, firstWalletPath);
		const walletDocSnapshot = await getDoc(walletDocRef);

		if (walletDocSnapshot.exists()) {
			return JSON.stringify(walletDocSnapshot.data().accountId);
		}
	  }
	}
  }

  async firebaseFetchUser(docId) {
	  
	  console.log("\nEntered firebasefetch with parameter:" + docId); 
	  
    const userRef = doc(this.users, docId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
		console.log("\nUserdocexists");
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
