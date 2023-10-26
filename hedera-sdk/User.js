import Wallet from './wallets.js';
import foundry from './foundry.js';
import firebaseConfig from './firebase.js';
import FirebaseHandler from './firebase.js';

const { Client } = require("@hashgraph/sdk");


class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.kycId = name + email; // Change later.
    this.wallets = [];     // A collection of Wallet objects
    this.client = Client.forTestnet;
  }

  // Method to add a wallet to the user's collection
  async createNewWallet(alias, balance, currencyId) {
    // Creates a new wallet, or gets the genesis wallet from the foundry.
    if (alias === null || balance === null || currencyId === null) { return; }

    if (this.wallets.length === 0) { // First/Primary wallet for user, will be paid for by wallet foundry
      this.wallets.push(foundry.requestGenesisWallet(balance, alias, currencyId));
    }
    else {
      this.wallets[0].setClient(this.client);
      this.wallets.push(foundry.requestNewWallet(client, balance, alias, currencyId));
    }

    // Update this user in firebase:
    FirebaseHandler.updateUser(JSON.stringify(this), this.kycId);
  }

  // Method to get all wallets associated with the user
  getWallets() {
    return this.wallets;
  }
  
}