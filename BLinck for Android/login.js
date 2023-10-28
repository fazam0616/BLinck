import React, { useRef, useState } from 'react';
import Modal from 'react-native-modal'; // Import the modal library

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import {View, Text, Image, ScrollView, TextInput, Button, ImageBackground, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import User from 'hedera-sdk/User.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './dashboard.js'
import FirebaseHandler from 'hedera-sdk/firebase.js'
import foundry from 'hedera-sdk/foundry.js';
  
async function GSignIn(nav, fhandle){
    GoogleSignin.configure({
        androidClientId: '76329107601-20n9pm9sq7a1fj1hedokc2f4m1ms7s96.apps.googleusercontent.com',
        offlineAccess: true,
        webClientId: '76329107601-qhskvslr7ansj0uful9ciq129le76r3n.apps.googleusercontent.com',
    });

    GoogleSignin.hasPlayServices().then((hasPlayService) => {
        if (hasPlayService) {
            GoogleSignin.signIn().then((data) => {
            console.log(data);
                let name=(data['user'])['name'];
                let email=(data['user'])['email'];
                let token=data['idToken'];//NOT CORRECT BUT I DONT WANNA DO BASE64 DECODING (use "kid" value?)
        
                currentUser = new User(name, email,token,[]);
                console.log(currentUser);
                currentUser.firebaseUpdateUser(fhandle);
                 
                nav.replace('Dashboard',{user:currentUser});
            }).catch((e) => { console.log("ERROR IS: " + JSON.stringify(e)); })
        }
    }).catch((e) => {console.log("ERROR IS: " + JSON.stringify(e));});

}


async function handleSignIn(nav, fhandle, email, password) {
    console.log(email + password);
    if (email && password) {
        try {
          const currentUser = await foundry.getUserFromFirebase(email + password, fhandle); // MAYBE ERROR
          console.log('User Data:', currentUser);

          if (currentUser.email + currentUser.kycId === email + password) {
            console.log("Entering dashboard");
            nav.replace('Dashboard', { user:currentUser });
          }
          else {
            console.log("got data, inequality");
            throw new Error;
          }

        } catch (error) {
          console.error('User does not exist.' + currentUser.email + currentUser.kycId);
          // Show the error modal
          setisErrorModalVisible(true);
        }
      } 
    else {console.log('Please provide both email and password.');}
}



async function handleCreateAccount(nav, fhandle) {
    // Navigate to the "Create Account" screen
    nav.replace('CreateAccount', {fhandle});
}


export default function Login ({ route, navigation }) {
    console.log("entered login\n");
    const {fhandle} = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isErrorModalVisible, setisErrorModalVisible] = useState(false);
    const bgImageSource = {uri: 'https://firebasestorage.googleapis.com/v0/b/blinck-e6dcf.appspot.com/o/PURPLEBLOCKS.webp?alt=media&token=c0a71994-84ee-4831-9cdf-599271a6e86c'};
    const logoImageSource = {uri: 'https://firebasestorage.googleapis.com/v0/b/blinck-e6dcf.appspot.com/o/LOGOLOGOTEXT.png?alt=media&token=d0bafeb9-178b-4476-b27a-033fbfd9207f'};
    let nav = navigation;

    return (
        <View style={styles.container}>
            <ImageBackground source={bgImageSource} resizeMode="repeat" style={styles.bgImage} >
              <Image source={logoImageSource} style={styles.logo}/>

              
              <View style={styles.buttonContainer}>
                    <Button title="Sign in with Google" onPress={() => GSignIn(nav, fhandle)}/>
              </View>


              <View style={styles.inputContainer}>
                    <Text>Email:</Text>
                    <TextInput
                    onChangeText={setEmail}
                    style={styles.input}
                    placeholder="Enter your email"
                    />

                    <Text>Password:</Text>
                    <TextInput
                    onChangeText={setPassword}
                    style={styles.input}
                    placeholder="Enter your password"
                    />
                    <Button title="Sign in" onPress={() => handleSignIn(nav, fhandle, email, password)}/>

                    <TouchableOpacity onPress={() => handleCreateAccount(nav, fhandle)}>
                    <Text>Create Account</Text>
                    </TouchableOpacity>



                    <Modal isVisible={isErrorModalVisible}>
                        <View style={styles.modalContent}>
                            <Text>Invalid username or password</Text>
                            <Button title="Close" onPress={() => setisErrorModalVisible(false)} />
                        </View>
                    </Modal>

                </View>
            </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  dashboard: {
    flex: 1,
    padding: 0,
  },
  bgImage: {
    flex:1,
    flexDirection:'column'
  },
  logo: {
      marginTop:'40%',
      height: 60,
      width:250,
      alignSelf: 'center',
      resizeMode: 'cover'
  },
  buttonContainer:{
      width:200,
      height:100,
      alignSelf: 'center',
      marginTop:'2%'
  },
  card:{
      width:250,
      height:157,
      flexDirection:'row',
      flex:1,
      margin:5,
      position:'relative',
      borderRadius:10
  },
  cardText:{
      color:'white',
      fontSize:20,
      marginLeft:5,
      position:'absolute',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
  },
  cardBalance:{
      color:'white',
      fontSize:25,
      marginLeft:5,
      marginTop:123,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 5
  },
  dashboardName:{
      color:'white',
      fontSize:35,
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 5
  },
  infoSummary:{
      margin:5,
      position:'relative',
      height:40,
      textShadowRadius: 10,
      backgroundColor:'#25182e',
      borderRadius:10,
      flexDirection:'row',
      display:'flex',
      justifyContent:'space-between',
  },
  infoSummaryTitle:{
      color:'white',
      fontSize:28,
      marginLeft:3,
  },
  infoSummaryDesc:{
      color:'white',
      fontSize:14,
      top:0,
  },
  infoSummaryAmount:{
      color:'white',
      fontSize:20,
      // position:'absolute',
      // right:5,
      // top:6,
  },
  tabOption:{
      headerShown: false
  },
  addCardButton:{
      borderRadius: 20,
  },
  addCardContainer:{
      width:300,
      alignSelf:'center',
      padding:5
  },
  input:{
      fontSize:28,
      color:'white',
      backgroundColor:"#3c274a"
  },
  inputContainer:{
      borderWidth:2,
      borderColor:"#25182e",
      margin:5
  },
  addCardSubtitle:{
      color:'white',
      fontSize:30,
      marginLeft:7
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
