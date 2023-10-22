// Example code file made using Getting Started documentation.

// Includes:
const { Client, PrivateKey, AccountCreateTransaction, AccountBalanceQuery, Hbar } = require("@hashgraph/sdk");

  require("dotenv").config();
  

  // Load .env and Account_id and shit:
  async function environmentSetup() {
    // Grab your Hedera testnet account ID and private key from your .env file
    const AccountId = process.env.ACCOUNT_ID;
    const PrivateKey = process.env.PRIVATE_KEY;
  
    // If we weren't able to grab it, we should throw a new error
    if (AccountId == null || PrivateKey == null) {
      throw new Error(
        "Environment variables myAccountId and myPrivateKey must be present"
      );
    }
  
   // Create your connection to the Hedera Network: The AccountId connects you as this account.
  const client = Client.forTestnet();
  client.setOperator(AccountId, PrivateKey);

  //Set the default maximum transaction fee (in Hbar)
  client.setDefaultMaxTransactionFee(new Hbar(100));

  //Set the maximum payment for queries (in Hbar)
  client.setDefaultMaxQueryPayment(new Hbar(1000));

  console.log("\nCurrent account ID: " + AccountId);

  // Verify the account balance
  const curaccountBalance = await new AccountBalanceQuery()
    .setAccountId(AccountId)
    .execute(client);

  console.log("The current account balance is: " + curaccountBalance.hbars.toTinybars() + " tinybar.\n");


  // Create new keys
  const newAccountPrivateKey = PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;

  // Create a new account with 1,000 tinybar starting balance
  const newAccount = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(Hbar.fromTinybars(1000))
    .execute(client);

  // Get the new account ID
  const getReceipt = await newAccount.getReceipt(client);
  const newAccountId = getReceipt.accountId;
  
  console.log("\nNew account ID: " + newAccountId);

  // Verify the account balance
  const accountBalance = await new AccountBalanceQuery()
    .setAccountId(newAccountId)
    .execute(client);

  console.log("The new account balance is: " + accountBalance.hbars.toTinybars() + " tinybar.\n");

// Create a transfer transaction: Transfers 1k Tinybars from AccountId to newAccountId
const sendHbar = await new TransferTransaction()
.addHbarTransfer(AccountId, Hbar.fromTinybars(-1000))
.addHbarTransfer(newAccountId, Hbar.fromTinybars(1000))
.execute(client);

// Verify the transaction reached consensus
const transactionReceipt = await sendHbar.getReceipt(client);
console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString() + '\n');

const AfteraccountBalance = await new AccountBalanceQuery()
.setAccountId(newAccountId)
.execute(client);

console.log("The new account balance after the transfer is: " + AfteraccountBalance.hbars.toTinybars() + " tinybar.\n");

}
environmentSetup();