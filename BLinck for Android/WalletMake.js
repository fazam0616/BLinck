import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import FirebaseHandler from './hedera-sdk/firebase';
import User from './hedera-sdk/User';
import Wallet from './hedera-sdk/wallet';

const currencyOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'CAD', value: 'CAD' },
  { label: 'HBAR', value: 'HBAR' },
];

async function addNewCard(navigation, user, alias, balance, currId) {
  let FHandle = new FirebaseHandler();
  let u = new User(user.name, user.email, user.kycId);
  await u.createNewWallet(alias, balance, currId);
  await u.firebaseUpdateUser(FHandle);
  navigation.goBack();
}

export default function WalletMake({ route, navigation }) {
  const { user } = route.params;

  const [alias, setAlias] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('HBAR'); // Set the initial currency to HBAR

  const handleCreateWallet = async () => {
    try {
      // Call the addNewCard function with the selected data
      await addNewCard(navigation, user, alias, amount, selectedCurrency);

      // You can also add a success message or action here
    } catch (error) {
      // Handle any errors here
      console.error('Error creating wallet:', error);
    }
  };

    // There is absolutely no error handling anywhere.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Wallet</Text>
      <TextInput
        style={styles.input}
        placeholder="Wallet Alias"
        value={alias}
        onChangeText={(text) => setAlias(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Initial Balance"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />
      <Text>Currently only HBAR wallets are supported, sorry</Text>
      <Button title="Make the wallet" onPress={handleCreateWallet} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
