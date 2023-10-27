import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {View, Text, Image, ScrollView, TextInput, Button, ImageBackground, StyleSheet, Alert} from 'react-native';
import User from 'hedera-sdk/User.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './dashboard.js'
import FirebaseHandler from 'hedera-sdk/firebase.js'

async function signIn(nav, fhandle){
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
                    let name=(data['user'])['name'];
                    let email=(data['user'])['email'];
                    let token=data['idToken'];//NOT CORRECT BUT I DONT WANNA DO BASE64 DECODING (use "kid" value?)
                    //let re=/"kid"\:"[a-zA-Z0-9]+"/g;
                    //console.log(re.match(Buffer.from(token, 'base64').toString('ascii')));

                    // console.log("Userdata: "+userData);
                    //let {userEmail,last,first} = userData;
                    //currentUser = User(first+" "+last, userEmail,token,[]);
                    //currentUser.firebaseUpdateUser(fhandle);
                    currentUser = new User(name, email,token,[]);
                    console.log(currentUser);
                    currentUser.firebaseUpdateUser(fhandle);
                    if (currentUser.wallets.length == 0){
                        console.log(currentUser.wallets.length);
                        currentUser.createNewWallet("Chequing",20,"USD");
                        currentUser.firebaseUpdateUser(fhandle);
                    }

                    //setWallet(user.wallets);
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

export default function Login ({ route, navigation }) {
    const {fhandle} = route.params;
    const bgImageSource = {uri: 'https://firebasestorage.googleapis.com/v0/b/blinck-e6dcf.appspot.com/o/PURPLEBLOCKS.webp?alt=media&token=c0a71994-84ee-4831-9cdf-599271a6e86c'};
    const logoImageSource = {uri: 'https://firebasestorage.googleapis.com/v0/b/blinck-e6dcf.appspot.com/o/LOGOLOGOTEXT.png?alt=media&token=d0bafeb9-178b-4476-b27a-033fbfd9207f'};
    const nav = navigation;
    return (
        <View style={styles.container}>
            <ImageBackground source={bgImageSource} resizeMode="repeat" style={styles.bgImage} >
              <Image source={logoImageSource} style={styles.logo}/>
              <View style={styles.buttonContainer}>
                  <Button title="Sign in!" onPress={() => signIn(nav, fhandle)}/>
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
  }
});
