// Realistically, all genesis wallet stuff would only be server-side, 
// but Firebase Functions would cost me money lol.

import {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountBalanceQuery,
    Hbar,
    TransferTransaction,
} from "@hashgraph/sdk";
  
import Wallet from './wallet.js';
import FirebaseHandler from './firebase.js';

class foundry { 
    genesisPrivateKey;
    genesisAccountId;

    constructor() { // REPLACE WITH A FIREBASE THING (d: CAN'T, IT COSTS MONEY. WHO CARES IF THIS IS THE LEAST SECURE THING KNOWN TO MAN)
        this.genesisAccountId = "0.0.1113463";
        this.genesisPrivateKey = "302e020100300506032b65700422042008fe74c5cb3f6de35a868a08f190f0547131d4186ef0a6223db7b05a888de491"; // we don't want this
    }

    async requestGenesisWallet(balance, alias, currencyId) { // "working"
        const newAccountPrivateKey = PrivateKey.generateED25519(); 
        const newAccountPublicKey = newAccountPrivateKey.publicKey;
		
        const genesisClient = Client.forTestnet();
		genesisClient.setOperator(this.genesisAccountId, this.genesisPrivateKey);
        genesisClient.setDefaultMaxTransactionFee(new Hbar(100));
        genesisClient.setDefaultMaxQueryPayment(new Hbar(50));
		
        // Create a new account with (balance) tinybar starting balance
        const newAccountTransactionResponse = await new AccountCreateTransaction()
        .setKey(newAccountPublicKey)
        .setInitialBalance(Hbar.fromTinybars(balance))
        .execute(genesisClient);

        // Get the new account ID
        const getReceipt = await newAccountTransactionResponse.getReceipt(genesisClient);
        const newAccountId = getReceipt.accountId;
        console.log("\nNew account ID: " + newAccountId);

        const receipts = [getReceipt];
        return new Wallet(newAccountId, alias, balance, newAccountPublicKey, newAccountPrivateKey, currencyId, receipts);
    }

    static async getUserFromFirebase(userId, FHandle) {
        console.log("Enterd Foundry fcn");
        const w2 = [];
        const juser = await FHandle.firebaseFetchUser(userId);
		
		console.log("\n\n We got JSON user:" + JSON.stringify(juser));
        // Fill an array with wallet objects from reference.
        for (let wall of juser.wallets) {
			const walll = await FHandle.getDocumentAtPath(wall);
            w2.push(walll);
        }
		juser.wallets = w2;
        return juser;
    }
}

export default foundry;
