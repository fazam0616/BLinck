import React, { useState, useRef } from 'react';
import Modal from 'react-native-modal'; // Import the modal library

import {View, Text, Image, ScrollView, TextInput, Button, ImageBackground, StyleSheet, Alert} from 'react-native';
import User from 'hedera-sdk/User.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './dashboard.js'
import FirebaseHandler from 'hedera-sdk/firebase.js'
import foundry from 'hedera-sdk/foundry.js';


// TO DEBUG
async function handleCreateAccount(fhandle, nav, name, email, password) {
    // Get the email, password, and name entered by the user
    const userEmail = email;
    const userPassword = password;
    const userName = name;
  
    // Create a User object
    let newUser = new User(userName, userEmail, userPassword, []);
    console.log("got here" + userName + userEmail + userPassword);
    console.log("now:" + newUser.email + newUser.kycId);
    console.log("got here" + Object.assign({}, newUser));
    console.log("now2:" + newUser.email + newUser.kycId);

    try {
      // Attempt to create the user account
      const userCreated = await fhandle.firebaseCreateAccount(newUser.email + newUser.kycId, Object.assign({}, newUser));
      if (userCreated === "gucci") {
        // User account was created successfully
        nav.replace('Dashboard', { user:newUser });
      } else {
        // User account already exists; show an error dialog
        // You can display an error message or handle it in your preferred way
        console.log('User account already exists.');
      }
    } catch (error) {
      // Handle any potential errors here
      console.error('Error creating user account:', error);
    }
};


export default function CreateAccount({route, navigation}) {
    let {fhandle} = route.params;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

    let nav = navigation;
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const logoimagesource = "https://firebasestorage.googleapis.com/v0/b/blinck-e6dcf.appspot.com/o/LOGOLOGOTEXT.png?alt=media&token=d0bafeb9-178b-4476-b27a-033fbfd9207f"
  
  return (
    <View style={styles.container}>
      <Image source={logoimagesource} style={styles.logo} />

      <Text>Email:</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={setEmail}
            />
      <Text>Password:</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter your password"
            onChangeText={setPassword}
            />
        <Text>Full name:</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={setName}
      />

        <Modal isVisible={isErrorModalVisible}>
            <View style={styles.modalContent}>
                <Text>Account Creation error.</Text>
                <Button title="Close" onPress={() => setIsErrorModalVisible(false)} />
            </View>
        </Modal>  

      <Button title="Create Account" onPress={() => handleCreateAccount(fhandle, nav, name, email, password)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }
});