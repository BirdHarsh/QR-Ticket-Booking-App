import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  TextInput
} from 'react-native';
import { OtpInput } from "react-native-otp-entry";
import auth from "@react-native-firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";



const OtpEnter = () => {
const navigation =useNavigation();
const [otpInput, setotpInput] = useState('');
const [confirmData, setConfirmData]= useState('');
const route = useRoute();
const { data } = route.params;






const confirmCode =async ()=>{
        try{

            setConfirmData(confirmation);
            const response = await confirmation.confirm(otpInput);
            console.log(confirmation);
            }
            catch(err)
            {
            console.log(err);}

};

const check =()=>{

console.log(data);



};
const next =()=>{

navigation.navigate("Home");



};




  return (
    <View >
      <OtpInput numberOfDigits={6} onTextChange={(text) => setCode(text)} />
      <TextInput
            placeholder="confirm"
            onChangeText={(value)=>setotpInput(value)}

      />
       <Button title="Press Me" onPress={confirmCode} />
       <Button title="check" onPress={check} />
       <Button title="next" onPress={next} />

    </View>
  );
};

export default OtpEnter;