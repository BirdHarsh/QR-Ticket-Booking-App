// ProfileScreen.js

import React, {useState} from 'react';
import { View, Text, StyleSheet,Button,TouchableOpacity,Modal } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth'

const ProfileScreen = () => {
const currentUser = auth().currentUser;
const number=currentUser.phoneNumber;


 const handleSignOut = () => {
    firebase.auth().signOut();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{number}</Text>
      <Text style={styles.text}>This is your profile screen.</Text>
      {/* Add more profile information and functionality as needed */}
       <Button title="Sign Out" onPress={handleSignOut} />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },

container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: 18,
    color: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  closeButton: {
    marginTop: 10,
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },


});




export default ProfileScreen;
