
import {View, Text, Image, ScrollView, TextInput, Button, ImageBackground, StyleSheet, Alert} from 'react-native';
//import {LinearGradient} from 'react-native-linear-gradient';

function InfoSummary({title, desc, amount}){
    return (
        <View style={styles.infoSummary} >
            <Text style={styles.infoSummaryTitle}>{title}</Text>
            <Text style={styles.infoSummaryDesc}>{desc}</Text>
            <Text style={styles.infoSummaryAmount}>{'$'+amount}</Text>
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

export default function AccountSummary({route, navigation}) {
    const {user} = route.params;
    return (
        <View>
          <View>
            <Text style={styles.dashboardName}>{user.name}</Text>
          </View>
          <View>
            <ScrollView horizontal={true}>
            {user.wallets.map((item, i) => <Card title={item.alias} colour={"purple"} balance={item.balance} key={i}/>)}
            </ScrollView>
          </View>
          <View style={styles.addCardContainer}>
            <Button style={styles.addCardButton} title="Add Card!" onPress={() => navigation.navigate('AddCard', { user: user })} />
          </View>
          <InfoSummary title='Total Balance' desc='$CAD' amount='100' />
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
