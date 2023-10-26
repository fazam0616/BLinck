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

const config = {
  issuer: 'https://accounts.google.com',
  clientId: '76329107601-20n9pm9sq7a1fj1hedokc2f4m1ms7s96.apps.googleusercontent.com',
  redirectUrl: '',
  scopes: ['openid', 'profile']
};

const Stack = createNativeStackNavigator();

async function signIn(navigation){
   console.log('hola');

   GoogleSignin.configure({
       androidClientId: '76329107601-20n9pm9sq7a1fj1hedokc2f4m1ms7s96.apps.googleusercontent.com',
       //offlineAccess: true,
       //webClientId: 'YOUR_WEB_APPLICATION_CLIENT_ID_HERE',
       //iosClientId: 'ADD_YOUR_iOS_CLIENT_ID_HERE',
   });
   GoogleSignin.hasPlayServices().then((hasPlayService) => {
           if (hasPlayService) {
                GoogleSignin.signIn().then((userInfo) => {
                          console.log(JSON.stringify(userInfo));
                          navigation.navigate('Dashboard');
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

function Dashboard({navigation}) {
    return (
        <View>
            <Text>Hola</Text>
        </View>
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
            options={{gestureEnabled: false}}
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
  }
});

export default YourApp;
