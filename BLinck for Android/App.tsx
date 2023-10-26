import React, { useState } from 'react';
import {View, Text, Image, ScrollView, TextInput, Button, ImageBackground, StyleSheet, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authorize } from 'react-native-app-auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LinearGradient} from 'react-native-linear-gradient';
import FirebaseHandler from 'hedera-sdk/firebase.js'

var fhandle = new FirebaseHandler();

console.log(fhandle);
const config = {
  issuer: 'https://accounts.google.com',
  clientId: '76329107601-20n9pm9sq7a1fj1hedokc2f4m1ms7s96.apps.googleusercontent.com',
  redirectUrl: '',
  scopes: ['openid', 'profile'],
};

const Stack = createNativeStackNavigator();
async function signIn(nav){
   console.log('hola');

   GoogleSignin.configure({
       androidClientId: '76329107601-20n9pm9sq7a1fj1hedokc2f4m1ms7s96.apps.googleusercontent.com',
       offlineAccess: true,
       webClientId: '76329107601-qhskvslr7ansj0uful9ciq129le76r3n.apps.googleusercontent.com',
       //iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
   });
   GoogleSignin.hasPlayServices().then((hasPlayService) => {
           if (hasPlayService) {
                GoogleSignin.signIn().then((data) => {
                          console.log(data);
                          nav.replace('Dashboard',{navigation:nav,userInfo:data});
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
            <View>
                <Text style={styles.infoSummaryTitle}>{title}</Text>
                <Text style={styles.infoSummaryDesc}>{desc}</Text>
                <Text style={styles.infoSummaryAmount}>{'$'+desc}</Text>
            </View>
        </View>
    );
}

function Dashboard({route, navigation}) {
    const {userInfo} = route.params;
    const wallets = [];

    wallets.push(fakeWallet("Netlix","#2e2b30",'30'));
    wallets.push(fakeWallet("Amazon","purple",'100'));
    wallets.push(fakeWallet("Rent","blue",'1100'));

    return (
        <LinearGradient start={{ x: 0.4, y: 0.6 }} end={{ x: 1, y: 0 }}
        colors={['#573173', '#101011']} style={styles.dashboard}>
            <View>
            <Text style={styles.dashboardName}>{userInfo.user.name}</Text>
            </View>
            <ScrollView horizontal={true}>
                {wallets.map((item, i) => <Card title={item.title} colour={item.color} balance={item.balance}/>)}
            </ScrollView>
            <InfoSummary title='Total Balance' desc='$CAD' amount='100'/>
        </LinearGradient>
    );
}

const YourApp = () => {
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
      position: 'absolute',
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
      backgroundColor:'#25182e'
  },
  infoSummaryTitle:{
      color:'white',
      fontSize:28,
  },
  infoSummaryDesc:{
      color:'white',
      fontSize:14,
      position:'absolute'
  },
  infoSummaryAmount:{
      color:'white',
      fontSize:20,
      position:'absolute',
      marginRight:1
  }
});

export default YourApp;
