// Example code file made using Getting Started documentation.
const {
  Client,
  PrivateKey,
  AccountCreateTransaction,
  AccountBalanceQuery,
  Hbar,
  TransferTransaction,
} = require("@hashgraph/sdk");
require("dotenv").config();

async function getBalance(client, AccountId){

  const accountBalance = await new AccountBalanceQuery()
    .setAccountId(AccountId)
    .execute(client);

  console.log(
    "Account " + AccountId + " balance is: " +
      accountBalance.hbars.toTinybars() +
      " tinybars.\n"
  );
}

async function environmentSetup() {
  // Grab your Hedera testnet account ID and private key from your .env file
  const myAccountId = process.env.ACCOUNT_ID;
  const myPrivateKey = process.env.PRIVATE_KEY;

  console.log("Loaded .env\n");

  // If we weren't able to grab it, we should throw a new error
  if (myAccountId == null || myPrivateKey == null) {
    throw new Error(
      "Environment variables myAccountId and myPrivateKey must be present"
    );
  }

  // Create your connection to the Hedera network
  const client = Client.forTestnet();

  console.log("Loaded CLIENT\n");

  //Set your account as the client's operator
  client.setOperator(myAccountId, myPrivateKey);

  // Set default max transaction fee & max query payment
  client.setDefaultMaxTransactionFee(new Hbar(100));
  client.setDefaultMaxQueryPayment(new Hbar(50));
  
  const myaccountBalance = await new AccountBalanceQuery()
  .setAccountId(myAccountId)
  .execute(client);

  console.log(
  "Account " + myAccountId + " balance is: " +
    myaccountBalance.hbars.toTinybars() +
    " tinybars.\n"
  );

  console.log("About to generate new account\n");

  // Create new keys
  const newAccountPrivateKey = PrivateKey.generateED25519(); 
  const newAccountPublicKey = newAccountPrivateKey.publicKey;

  console.log("Trying key-pair: " + newAccountPrivateKey._key + '\n' + newAccountPrivateKey.publicKey);

  console.log("ED functions success\n");

  // Create a new account with 1,000 tinybar starting balance
  const newAccountTransactionResponse = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(Hbar.fromTinybars(1))
    .execute(client);

  console.log("Got newAccountId, awaiting Receipt\n");

  // Get the new account ID
  const getReceipt = await newAccountTransactionResponse.getReceipt(client);
  const newAccountId = getReceipt.accountId;

  console.log("\nNew account ID: " + newAccountId);


  // Verify the account balance
  const accountBalance = await new AccountBalanceQuery()
    .setAccountId(newAccountId)
    .execute(client);

  console.log(
    "New account balance is: " +
      accountBalance.hbars.toTinybars() +
      " tinybars."
  );

  // Create the transfer transaction
  const sendHbar = await new TransferTransaction()
    .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000))
    .addHbarTransfer(newAccountId, Hbar.fromTinybars(1000))
    .execute(client);

  // Verify the transaction reached consensus
  const transactionReceipt = await sendHbar.getReceipt(client);
  console.log(
    "The transfer transaction from my account to the new account was: " +
      transactionReceipt.status.toString()
  );

  // Request the cost of the query
  const queryCost = await new AccountBalanceQuery()
    .setAccountId(newAccountId)
    .getCost(client);

  console.log("\nThe cost of query is: " + queryCost);

  // Check the new account's balance
  const getNewBalance = await new AccountBalanceQuery()
    .setAccountId(newAccountId)
    .execute(client);

  console.log(
    "The account balance after the transfer is: " +
      getNewBalance.hbars.toTinybars() +
      " tinybars."
  );
}
environmentSetup();
