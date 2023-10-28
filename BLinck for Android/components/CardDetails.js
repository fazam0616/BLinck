import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import the Wallet class from the appropriate path
import Wallet from '../hedera-sdk/wallet.js';

function CardDetails({ visible, onClose, wallet, user }) {
  const navigation = useNavigation();

  // Retrieve the last 3 transactions from the wallet object
  const lastTransactions = wallet.receipts.slice(0, 3);

  const goToTransactionScreen = () => {
    // Navigate to the "Transaction" screen and pass the wallet and user objects
    navigation.navigate('Transaction', { user, wallet });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.drawerContainer}>
        <View style={styles.drawer}>
          <Text style={styles.title}>Last 3 Transactions:</Text>
          {lastTransactions.map((transaction, index) => (
            <View key={index} style={styles.transaction}>
              <Text>{`Transaction #${index + 1}`}</Text>
              {/* Display transaction details, e.g., date, amount, etc. */}
              <Text>{`Date: ${transaction.date}`}</Text>
              <Text>{`Amount: ${transaction.amount}`}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.transactionButton} onPress={goToTransactionScreen}>
            <Text style={styles.buttonText}>Go to Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  drawer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transaction: {
    marginBottom: 16,
  },
  transactionButton: {
    backgroundColor: 'blue',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  closeButtonText: {
    color: 'white',
  },
});

export default CardDetails;
