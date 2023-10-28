import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WalletMake from '../WalletMake';

function CardMaker({ route, navigation }) {
  const { user } = route.params;
  console.log(JSON.stringify(user));
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.replace('WalletMake', { user: user })}
    >
      <View style={styles.creditCardOutline}>
        <Ionicons name="ios-add-circle" size={50} color="gray" />
      </View>
      <Text style={styles.creditCardText}>Add your first wallet</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 157,
    flexDirection: 'row',
    margin: 5,
    position: 'relative',
    borderRadius: 10,
    backgroundColor: 'lightgray', // Light gray background
  },
  creditCardOutline: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditCardText: {
    color: 'gray',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default CardMaker;
