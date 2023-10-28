import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardScroller from './components/CardContainer.js';
import CardMaker from './components/CardMaker.js';
import User from './hedera-sdk/User.js';
import foundry from './hedera-sdk/foundry.js';
import FirebaseHandler from './hedera-sdk/firebase.js';

export default function AccountSummary({ route, navigation }) {
  const { userr } = route.params; 
  const FHandle = new FirebaseHandler()
  const user = foundry.getUserFromFirebase(userr.email + userr.kycId, FHandle); // Updates User each time

  const totalBalance = user.wallets.reduce((acc, wallet) => acc + wallet.balance, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Summary</Text>
      
      {/* Render CardScroller if user has wallets, otherwise, render CardMaker */}
      {user.wallets.length > 0 ? (
        <CardScroller route={route} navigation={navigation} />
      ) : (
        <CardMaker route={route} navigation={navigation} />
      )}
      <View style={styles.totalBalanceContainer}>
        <Text style={styles.totalBalanceText}>
          Total Balance: {totalBalance} HBAR
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  totalBalanceContainer: {
    alignItems: 'center',
  },
  totalBalanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
