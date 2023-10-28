import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import WalletCard from './WalletCard.js';

function CardScroller({ route, navigation }) {
  const { user } = route.params;

  const handleCardPress = (wallet, user, nav, fhandle) => {
    // Navigate to the CardDetails screen and pass the selected wallet
    return(<CardDetails visible={true} wallet={wallet} user={user}/>);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Wallets</Text>
      <ScrollView horizontal style={styles.scrollContainer}>
        {user.wallets.map((wallet, index) => (
          <WalletCard
            key={index}
            name={wallet.alias}
            balance={wallet.balance}
            currencyId={wallet.currencyId}
            onPress={() => handleCardPress(wallet)}
          />
        ))}
        <Button
          title="Create Wallet"
          onPress={() => navigation.navigate('WalletMake', { user: user })}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  scrollContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginLeft: 16,
  },
});

export default CardScroller;
