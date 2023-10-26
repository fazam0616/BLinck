import Wallet from './wallets.js';
import foundry from './foundry.js';
import firebaseConfig from './firebase.js';
import FirebaseHandler from './firebase.js';
import User from './User.js'

// Import your classes and functions
const User = require('./User.js'); // Adjust the path to your actual file
const Wallet = require('./wallet.js'); // Adjust the path to your actual file
const FirebaseHandler = require('./firebase.js'); // Adjust the path to your actual file

// Your actual test cases start here

// Test case 1: Creating a User
const usr = new User('TestUser', 'test@example.com', 'password', []);

// Assertion
console.log('Test case 1: Creating a User\n');
console.log('Is user an instance of User?', usr instanceof User);
console.log("\nUser details:" + usr + '\n');

// Test case 2: Creating a Wallet from the Genesis
usr.createNewWallet('first', 50, "USD");
usr.createNewWallet('second', 20, "USD");

walls = usr.getWallets();
// Assertion
console.log(walls);
console.log('\nIs genesisWallet an instance of Wallet?', walls[0] instanceof Wallet);
console.log('\nIs genesisWallet an instance of Wallet?', walls[1] instanceof Wallet);

// Test firebaseUpdateUser: 
console.log('\nTesting Firebase:');
usr.firebaseUpdateUser();
console.log("\nCheck firebase dingus");

usr.firebaseUpdateUser();

// Test case 5: Downloading User and Wallets from Firebase
const usr2 = foundry.getUserFromFirebase(usr.kycId);

console.log("\nAre they equal? Not right, but objects.", usr === usr2);