const {
    Client,
    PrivateKey,
    AccountBalanceQuery,
    Hbar,
    TransferTransaction,
} = require("@hashgraph/sdk");
import FirebaseHandler from './firebase.js';

class Wallet {
    constructor(accountId, alias, balance, publicKey, privateKey, currencyId, receipts) {
      this.accountId = accountId;     // Hedera account ID
      this.alias = alias;             // Alias for this wallet, used user-side.
      this.balance = balance;         // Account balance
      this.publicKey = publicKey;     // Public key associated with the account
      this.privateKey = privateKey;   // Private key for signing transactions (keep this secure)
      this.currencyId = currencyId;   // String, Denominates the Fiat currency we're working with.
      this.receipts = receipts;       // Array of Hedera Receipt objects.
    }

    async getBalance(client) {

        this.setClient(client);
        // Returns the Balance of a wallet. Requires a client from whomever is responsible for it.
        const accountBalance = await new AccountBalanceQuery().setAccountId(newAccountId).execute(client);
        console.log("New account balance is: " +accountBalance.hbars.toTinybars() +" tinybars.");
        const transactionReceipt = await accountBalance.getReceipt(client);

        return accountBalance.hbars.toTinybars()/transactionReceipt.exchangeRate;
    }

    setClient(client) {
        client.setOperator(this.accountId, this.privateKey);
        client.setDefaultMaxTransactionFee(new Hbar(100));
        client.setDefaultMaxQueryPayment(new Hbar(50));
    }

    async initiateTransaction(client, amount, targetEmail) {
        if (this.balance < amount) {return null;} // needs error handling
        this.setClient(client); 

        const targetId = FirebaseHandler.firebaseFetchAcctIdbyEmail(targetEmail);

        const sendHbar = await new TransferTransaction()
        .addHbarTransfer(myAccountId, Hbar.fromTinybars(-amount))
        .addHbarTransfer(targetId, Hbar.fromTinybars(amount))
        .execute(client);

        // Verify the transaction reached consensus
        const transactionReceipt = await sendHbar.getReceipt(client);
        this.receipts.push(transactionReceipt);

        // Upload Receipt to Firebase:
        console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());

        FirebaseHandler.fireabseUpdateWallet(this.alias + this.accountId, JSON.stringify(this));
    }
}