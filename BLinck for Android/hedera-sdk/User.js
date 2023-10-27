// import Wallet from './wallet.js'
import FirebaseHandler from "./firebase.js";
import foundry from './foundry.js';
import { Client } from "@hashgraph/sdk";



class User {
  constructor(name, email, token, wallets) {
    this.name = name;
    this.email = email;
    this.kycId = token; // Change later.
    this.wallets = wallets;     // A collection of Wallet objects
  }

  async firebaseUpdateUser(FHandle) {
    const w2 = []
    for (const wall of this.wallets) {
      let refref = await FHandle.firebaseCreateWallet(wall.alias + wall.accountId, JSON.stringify(wall));
	  console.log("refref" + refref);
	  w2.push(refref);
    }
	console.log("array of references:" + w2);
    const clone = { ...this }
    clone.wallets = w2;
    clone.client = null;
    const jclone = JSON.stringify(clone);
    FHandle.firebaseUpdateAccount(jclone, this.kycId);
  }




  // Method to add a wallet to the user's collection
  async createNewWallet(alias, balance, currencyId) {
      console.log(alias);
	 const f = new foundry();
    // Creates a new wallet, or gets the genesis wallet from the foundry.
    if (alias === null || balance === null || currencyId === null) { return; }

     // First/Primary wallet for user, will be paid for by wallet foundry
    this.wallets.push(await f.requestGenesisWallet(balance, alias, currencyId));
	console.log("\nthis is User.js; your wallet account id is:" + this.wallets.at(-1).accountId);
	//console.log("\nNew wallet created:" + JSON.stringify(this.wallets.at(-1)));
  }

  // Method to get all wallets associated with the user
  getWallets() {
    return this.wallets;
  }

}

export default User
