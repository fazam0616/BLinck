import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

export default function Tasks({route, navigation}){
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  
  // Define an array of tasks, where each task is an object with a name and a function
  const tasks = [
    {
      name: 'Task 1',
      func: () => {
        return 'This is the result of Task 1';
      },
    },
    {
      name: 'Task 2',
      func: () => {
        return 'This is the result of Task 2';
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
      {/* {tasks.map((task, index) => (
        <Button
          key={index}
          title={task.name}
          onPress={() => handleTaskClick(task.func)}
        />
      )} */}
  
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
