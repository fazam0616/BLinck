import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

export default function Tasks({route, navigation}){
  const { user } = route.params
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const totalBalance = user.wallets.reduce((acc, wallet) => acc + wallet.balance, 0);
  const taxes = totalBalance * 0.12;
  const afterRent = totalBalance - 1000;
  
  // Define an array of tasks, where each task is an object with a name and a function
  const tasks = [
    {
      name: 'Calculate my Taxes',
      func: () => {
        return " Your total taxes are:" + taxes.toString() ;
      },
    },
    {
      name: 'Calculate after Rent',
      func: () => {
        return 'You will have' + afterRent.toString() + 'after paying rent this month lol';
      },
    },
  ];

  const handleTaskClick = (taskFunc) => {
    // Call the task's function and set the result in the modal
    const result = taskFunc();
    setModalContent(result);
    setModalVisible(true);
  };

  return(
    <View style={styles.container}>

      {tasks.map((task, index) => (
        <Button
          key={index}
          title={task.name}
          onPress={() => handleTaskClick(task.func)}
        />
      ))}
  
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>{modalContent}</Text>
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
