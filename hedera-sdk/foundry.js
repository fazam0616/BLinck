// Realistically, all genesis wallet stuff would only be server-side, 
// but Firebase Functions would cost me money lol.

const {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountBalanceQuery,
    Hbar,
    TransferTransaction,
} = require("@hashgraph/sdk");
require("dotenv").config();
  
import Wallet from './wallet.js';
import firebaseClient from './firebase.js';

class foundry { 
    #genesisPrivateKey;
    #genesisAccountId;
    #genesisClient;

    constructor() { // REPLACE WITH A FIREBASE THING
        this.#genesisPrivateKey = process.env.PRIVATE_KEY;
        this.#genesisAccountId = process.env.ACCOUNT_ID; // we don't want this
        this.#genesisClient = Client.forTestnet;
        this.#genesisClient.setOperator(this.#genesisAccountId, this.#genesisPrivateKey);
        this.#genesisClient.setDefaultMaxTransactionFee(new Hbar(100));
        this.#genesisClient.setDefaultMaxQueryPayment(new Hbar(50));
    }

    async requestGenesisWallet(balance, alias, currencyId) {
        const newAccountPrivateKey = PrivateKey.generateED25519(); 
        const newAccountPublicKey = newAccountPrivateKey.publicKey;

        // Create a new account with 1,000 tinybar starting balance
        const newAccountTransactionResponse = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(balance))
        .execute(this.#genesisClient);

        // Get the new account ID
        const getReceipt = await newAccountTransactionResponse.getReceipt(this.#genesisClient);
        const newAccountId = getReceipt.accountId;
        console.log("\nNew account ID: " + newAccountId);

        receipts = [getReceipt];
        return new Wallet(newAccountId, alias, balance, newAccountPublicKey, newAccountPrivateKey, currencyId, receipts);
    }

    static async requestNewWallet(client, balance, alias, currencyId) {
        const newAccountPrivateKey = PrivateKey.generateED25519(); 
        const newAccountPublicKey = newAccountPrivateKey.publicKey;

        // Create a new account with 1,000 tinybar starting balance
        const newAccountTransactionResponse = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(balance))
        .execute(client);

        // Get the new account ID
        const getReceipt = await newAccountTransactionResponse.getReceipt(this.client);
        const newAccountId = getReceipt.accountId;
        console.log("\nNew account ID: " + newAccountId);

        receipts = [getReceipt];
        const newWallet = new Wallet(newAccountId, alias, balance, newAccountPublicKey, newAccountPrivateKey, currencyId, receipts)
    
        return newWallet;
    }

    static async getUserFromFirebase(userId) {
        w2 = [];
        juser = FirebaseHandler.firebaseFetchUser(userId);
        uclone = JSON.parse(uclone);
        // Fill an array with wallet objects from reference.
        for (wall in uclone.wallets) {
            w2.push(JSON.parse(FirebaseHandler.firebaseFetchWallet(wall.alias + wall.accountId)));
        }
        useruser = new User(uclone.name, uclone.email, uclone.password, w2);
        return useruser;
    }
}