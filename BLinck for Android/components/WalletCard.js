import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

function WalletCard({ name, balance, currencyId, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{name}</Text>
      <Text style={styles.cardBalance}>{`Balance: ${balance} ${currencyId}`}</Text>
      <Button title="Add" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    margin: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardBalance: {
    fontSize: 16,
  },
});

export default WalletCard;
