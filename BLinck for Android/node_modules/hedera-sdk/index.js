import User from './User.js';
import Wallet from './wallet.js';
import FirebaseHandler from './firebase.js';
import foundry from './foundry.js';
// Import your classes and functions
// Your actual test cases start here

// Test case 1: Creating a User
const usr = new User('TestUser', 'test@example.com', 'password', []);
const FHandle = new FirebaseHandler();

// Assertion
console.log('Test case 1: Creating a User\n');
console.log('Is user an instance of User?', usr instanceof User);
console.log("\nUser details:" + usr.name + " " + usr.email + " " + usr.kycId + '\n');

// Test case 2: Creating a Wallet from the Genesis
console.log("About to make new wallets:\n");
await usr.createNewWallet('Fahim', 50, "USD");

//console.log("First wallet: ", usr.wallets[0]);

await usr.createNewWallet('Danny', 20, "USD");

//console.log("\nSecond wallet: ", usr.wallets[1]);

const walls = usr.getWallets();
console.log("\n This is Index, Our wallets have the Account IDs :" + walls[0].accountId + " " + walls[1].accountId); 
// Assertion
console.log(walls);
const accacc = walls[0].accountId.toString();
walls[0].accountId = accacc;
console.log(walls);

// Test firebaseUpdateUser: 
console.log('\nTesting Firebase:');
await usr.firebaseUpdateUser(FHandle);
console.log("\nCheck firebase dingus");

// Test case 5: Downloading User and Wallets from Firebase
const usr2 = await foundry.getUserFromFirebase(usr.kycId, FHandle);

//console.log("\nusr2:" + JSON.stringify(usr2));

const accId = await FHandle.firebaseFetchAcctIdbyEmail('test@example.com');
console.log("account id from email:" + accId);

console.log("\nAre they equal? Not right, but objects.", usr === usr2);