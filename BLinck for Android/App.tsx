import React, { useState } from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, ImageBackground, StyleSheet, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { authorize } from 'react-native-app-auth';
import {LinearGradient} from 'react-native-linear-gradient';
import FirebaseHandler from 'hedera-sdk/firebase.js'
import User from 'hedera-sdk/User.js';
import { Buffer } from 'buffer'
import Transactions from './transactions.js'
import Login from './login.js'
import Dashboard from './dashboard.js'

// import Wallet from 'hedera-sdk/wallet.js'
// import foundry from 'hedera-sdk/foundry.js';
// import { Client } from "@hashgraph/sdk";

var fhandle = new FirebaseHandler();

const config = {
  issuer: 'https://accounts.google.com',
  clientId: '76329107601-20n9pm9sq7a1fj1hedokc2f4m1ms7s96.apps.googleusercontent.com',
  redirectUrl: '',
  scopes: ['openid', 'profile'],
};

//const {wallets,setWallet} = React.useState([1,2]);



async function addNewCard(navigation,user,name,balance,currId){
    await user.createNewWallet(name,balance,currId);
    await user.firebaseUpdateUser(fhandle);
    //addWallet(user.wallets[-1]);
    navigation.goBack();
}

function AddCard({route,navigation}) {
    const {user} = route.params;
    const [name, onChangeName] = React.useState('');
    const [currId, onChangeCurrId] = React.useState('');
    const [balance, onChangeBalance] = React.useState(5);
    return (
        <LinearGradient start={{ x: 0.4, y: 0.6 }} end={{ x: 1, y: 0 }}
        colors={['#573173', '#101011']} style={styles.dashboard}>
            <View>
                <Text style={styles.addCardSubtitle}>{"Card Name"}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="My Card"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={onChangeName}
                        value={name}
                      />
                </View>
                <Text style={styles.addCardSubtitle}>{"Starting Balance"}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={onChangeBalance}
                        value={balance}
                      />
                </View>
                <Text style={styles.addCardSubtitle}>{"Currency Type"}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="USD"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={onChangeCurrId}
                        value={currId}
                      />
                </View>
                <Button title="Add" onPress={() => {
                    if (name&&currId) {
                        addNewCard(navigation,user,name,balance+"",currId);
                    }
                }}/>
            </View>
        </LinearGradient>
    );
}

// function addWallet(wallet) {
//     setItems([...wallets, wallet]);
// }



const YourApp = () => {
    const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Login"
            component={Login}
            initialParams={{fhandle:fhandle}}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
          />
          <Stack.Screen
            name="AddCard"
            component={AddCard}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
  }
});

export default YourApp;
