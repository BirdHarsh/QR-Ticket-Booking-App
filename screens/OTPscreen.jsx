import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { OtpInput } from "react-native-otp-entry";


const App = () => {
  return (
    <View >
      <OtpInput numberOfDigits={6} onTextChange={(text) => console.log(text)} />
     
    </View>
  );
};

export default App;