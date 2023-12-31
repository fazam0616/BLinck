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
console.log("\nUser details:" + usr.name + usr.email + usr.kycId + '\n');

// Test case 2: Creating a Wallet from the Genesis
usr.createNewWallet('first', 50, "USD");
usr.createNewWallet('second', 20, "USD");

const walls = usr.getWallets();
// Assertion
console.log(walls);
console.log('\nIs genesisWallet an instance of Wallet?', walls[0] instanceof Wallet);
console.log('\nIs genesisWallet an instance of Wallet?', walls[1] instanceof Wallet);

// Test firebaseUpdateUser: 
console.log('\nTesting Firebase:');
usr.firebaseUpdateUser(FHandle);
console.log("\nCheck firebase dingus");

//usr.firebaseUpdateUser(FHandle);

// Test case 5: Downloading User and Wallets from Firebase
const usr2 = foundry.getUserFromFirebase(usr.kycId);

console.log("\nAre they equal? Not right, but objects.", usr === usr2);