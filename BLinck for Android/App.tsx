import React, { useState } from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, ImageBackground, StyleSheet, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { authorize } from 'react-native-app-auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LinearGradient} from 'react-native-linear-gradient';
import FirebaseHandler from 'hedera-sdk/firebase.js'
import User from 'hedera-sdk/User.js'

// import Wallet from 'hedera-sdk/wallet.js'
// import foundry from 'hedera-sdk/foundry.js';
// import { Client } from "@hashgraph/sdk";

const fhandle = new FirebaseHandler();
const config = {
  issuer: 'https://accounts.google.com',
  clientId: '76329107601-20n9pm9sq7a1fj1hedokc2f4m1ms7s96.apps.googleusercontent.com',
  redirectUrl: '',
  scopes: ['openid', 'profile'],
};



async function signIn(nav){
   GoogleSignin.configure({
       androidClientId: '76329107601-20n9pm9sq7a1fj1hedokc2f4m1ms7s96.apps.googleusercontent.com',
       offlineAccess: true,
       webClientId: '76329107601-qhskvslr7ansj0uful9ciq129le76r3n.apps.googleusercontent.com',
       //iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
   });
   GoogleSignin.hasPlayServices().then((hasPlayService) => {
           if (hasPlayService) {
                GoogleSignin.signIn().then((data) => {
                    //console.log(data);
                    let name=(data['user'])['name'];
                    let email=(data['user'])['email'];
                    let token=data['idToken'];//NOT CORRECT BUT I DONT WANNA DO BASE64 DECODING (use "kid" value?)
                    // console.log("Userdata: "+userData);
                    //let {userEmail,last,first} = userData;
                    //currentUser = User(first+" "+last, userEmail,token,[]);
                    //currentUser.firebaseUpdateUser(fhandle);
                    currentUser = new User(name, email,token,[]);
                    currentUser.firebaseUpdateUser(fhandle);
                    //console.log(currentUser);
                    nav.replace('Dashboard',{user:currentUser});
                }).catch((e) => {
                console.log("ERROR IS: " + JSON.stringify(e));
                })
           }
   }).catch((e) => {
       console.log("ERROR IS: " + JSON.stringify(e));
   });
}

function Login ({ navigation }) {
    const bgImageSource = {uri: 'https://firebasestorage.googleapis.com/v0/b/blinck-e6dcf.appspot.com/o/PURPLEBLOCKS.webp?alt=media&token=c0a71994-84ee-4831-9cdf-599271a6e86c'};
    const logoImageSource = {uri: 'https://firebasestorage.googleapis.com/v0/b/blinck-e6dcf.appspot.com/o/LOGOLOGOTEXT.png?alt=media&token=d0bafeb9-178b-4476-b27a-033fbfd9207f'};
    const nav = navigation;
    return (
        <View style={styles.container}>
            <ImageBackground source={bgImageSource} resizeMode="repeat" style={styles.bgImage} >
              <Image source={logoImageSource} style={styles.logo}/>
              <View style={styles.buttonContainer}>
                  <Button title="Sign in!" onPress={() => signIn(nav)}/>
              </View>
            </ImageBackground>
        </View>
    );
}

function Card({title,balance,colour}){
    return (
            <View style={styles.card} backgroundColor={colour}>
                <View>
                    <Text style={styles.cardText}>{title}</Text>
                </View>
                <View>
                    <Text style={styles.cardBalance}>{'$'+balance}</Text>
                </View>
            </View>
    );
}

function fakeWallet(name, colour,amount){
    return {title:name,color:colour,balance:amount};
}

function InfoSummary({title, desc, amount}){
    return (
        <View style={styles.infoSummary} >
            <Text style={styles.infoSummaryTitle}>{title}</Text>
            <Text style={styles.infoSummaryDesc}>{desc}</Text>
            <Text style={styles.infoSummaryAmount}>{'$'+amount}</Text>
        </View>
    );
}

function Transactions({route,navigation}) {
    //The current user
    const {user} = route.params
    return (
        <View>
            <Text>PlaceHolder</Text>
        </View>
    );
}

function AddCard({route,navigation}) {
    const {user} = route.params;
    const [name, onChangeName] = React.useState('');
    const [currId, onChangeCurrId] = React.useState('');
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
                        user.createNewWallet(name,5,currId);
                        user.firebaseUpdateUser(fhandle);
                        navigation.goBack();
                    }
                }}/>
            </View>
        </LinearGradient>
    );
}

function AccountSummary({route, navigation}) {
    const {user} = route.params;
    
    return (
        <LinearGradient start={{ x: 0.4, y: 0.6 }} end={{ x: 1, y: 0 }}
        colors={['#573173', '#101011']} style={styles.dashboard}>
            <View>
                <Text style={styles.dashboardName}>{user.name}</Text>
            </View>
            <View>
                <ScrollView horizontal={true}>
                    {user.wallets.map((item, i) => <Card title={item.alias} colour={"purple"} balance={item.balance}/>)}
                </ScrollView>
            </View>
            <View style={styles.addCardContainer}>
                <Button style={styles.addCardButton} title="Add Card!" onPress={() => navigation.navigate('AddCard',{user:user})} />
            </View>
            <InfoSummary title='Total Balance' desc='$CAD' amount='100'/>
        </LinearGradient>
    );
}

function Dashboard({route, navigation}) {
    const Tab = createBottomTabNavigator();
    const {user} = route.params;
    console.log(user);

    return (
        <Tab.Navigator>
          <Tab.Screen name="Account Summary" component={AccountSummary} options={styles.tabOption} initialParams={{ user:user}}/>
          <Tab.Screen name="Transactions" component={Transactions}  options={styles.tabOption} initialParams={{ user:user}}/>

        </Tab.Navigator>
    );/*Add a Tab.Screen for every tab within the dashboard*/
}

const YourApp = () => {
    const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Login"
            component={Login}
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
