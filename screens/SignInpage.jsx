import React, {useState, useEffect,useRef} from 'react';
import {View, TextInput, Button, Alert, StyleSheet,TouchableOpacity,Modal,Text,ScrollView,SafeAreaView,ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import {initializeApp} from '@react-native-firebase/app';
import PhoneInput from 'react-native-phone-number-input';
import { OtpInput } from "react-native-otp-entry";

const SignIn = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [otpInput, setotpInput] = useState('');


  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
      setShowPopup(!showPopup);
    };


const [Loading, setLoading] = useState(false);
  const toggleLoading = () => {
      setLoading(!Loading);
    };

 const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef(null);


  const consoleOUT =()=>{


  console.log(value);
  console.log(formattedValue);



  };



  const handleSendOTP = async () => {
    try {
    toggleLoading();
      const confirmation = await auth().signInWithPhoneNumber(formattedValue);
      setConfirmation(confirmation);
      //Alert.alert('Success', 'OTP sent successfully!');
      console.log(confirmation);
      toggleLoading();
      togglePopup();
      //navigation.navigate("OtpEnter",{ data: confirmation });
    }

     catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  const confirmCode =async ()=>{
          try{

                toggleLoading();
              const response = await confirmation.confirm(otpInput);
              console.log(confirmation);
              toggleLoading();
              }
              catch(err)
              {
              console.log(err);}

  };


  const sendData=()=>
{
        navigation.navigate("OtpEnter",{ data: 'hello' });
        };
  return (<ScrollView>
    <View style={styles.container}>

    <Text style={styles.heading}>What is your phone number?</Text>
    <Text style={styles.text}>Tap "Continue" to get an SMS confirmation to help you
    use our App. We would like your phone number</Text>
    <View style={styles.containerB}>
      <PhoneInput
                  ref={phoneInput}
                  defaultValue={value}
                  defaultCode="IN"
                  layout="first"
                  onChangeText={text => {
                    setValue(text);
                  }}
                  onChangeFormattedText={text => {
                    setFormattedValue(text);
                  }}
                  countryPickerProps={{withAlphaFilter: true}}
                  withShadow
                  autoFocus
                />

                <TouchableOpacity style={styles.otpButton} onPress={handleSendOTP}>
                                                                                  <Text style={styles.ButtonText}>GET OTP</Text>
                                                                                </TouchableOpacity>

                </View>

                <Modal
                                            animationType="slide"
                                            transparent={true}
                                            visible={Loading}
                                            onRequestClose={toggleLoading}
                                          ><View style={styles.modalContainer}>
                                            <ActivityIndicator size="large" color="white" />
                                             <Text style={styles.loadingText}>...In Progress</Text>
                                          </View>

                   </Modal>




              <Modal
                            animationType="slide"
                            transparent={true}
                            visible={showPopup}
                            onRequestClose={togglePopup}
                          >

                          <View style={styles.modalContainer}>
                                    <View style={styles.popup2}>

                                       <Text style={styles.text}>Check your SMS messages. We've sent you the PIN at {formattedValue}</Text>

                                       <TouchableOpacity onPress={togglePopup}>
                                        <Text style={styles.closeButton}>Change number</Text>
                                          </TouchableOpacity>

                                       <View style={styles.popup}>

                                       <View style={styles.otp}>

                           <OtpInput numberOfDigits={6}
                                     onTextChange={(value)=>setotpInput(value)}
                                     onFilled= {confirmCode}



                                      />
                                       </View>





                                       <TouchableOpacity style={styles.otpButton} onPress={confirmCode}>
                                         <Text style={styles.ButtonText}>VERIFY</Text>
                                         </TouchableOpacity>
                                         <View style={{flexDirection: 'row',alignItems: 'center', // Center horizontally
                                                                                    justifyContent: 'center',marginTop:10}}>
                                         <Text>Didn't receive SMS  </Text>
                                         <TouchableOpacity onPress={handleSendOTP}>
                                                                                <Text style={styles.Resend}>Resend Code</Text>
                                                                                </TouchableOpacity></View>



                                        </View>
                                               </View>
                                               </View>


                          </Modal>





    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',

    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
   modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      padding: 20,
    },
    popup: {
      backgroundColor: 'white',

      borderRadius: 10,

      alignItems: 'center', // Center horizontally
                      justifyContent: 'center',
    },

     popup2: {
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          elevation: 5,
           // Center horizontally
                          justifyContent: 'center',
        },
     closeButton: {
        marginBottom:20,
        fontSize: 16,
        color: 'blue',

      },

      Resend:{
                      fontSize: 16,
                      color: 'red',
                      textAlign: 'center',},
       otpButton: {
                backgroundColor: '#007bff', // Button background color
                paddingVertical: 10, // Vertical padding
                paddingHorizontal: 20, // Horizontal padding
                borderRadius: 5, // Border radius to create rounded corners
                height:50,
                width:190,
                alignItems: 'center', // Center horizontally
                justifyContent: 'center',
                marginTop:40


              },
       ButtonText: {
             color: '#fff', // Button text color
             fontSize: 16, // Button text font size
             fontWeight: 'bold', // Button text font weight
             textAlign: 'center', // Center text horizontally
           },
        heading: {
           fontSize: 30,
           fontWeight: 'bold',
           color: 'black',
           textAlign: 'left',
           //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add opacity to the background color

           fontFamily: 'sans-serif',
           marginBottom:10,
           marginTop:30
         },
          text: {
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'black',
                     textAlign: 'justify',
                    //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add opacity to the background color

                    fontFamily: 'sans-serif',
                    marginBottom:10,
                    marginTop:30
                  },
           containerB: {
           marginTop:50,
              justifyContent: 'center', // Center-align View A vertically
                  alignItems: 'center', // Center-align View A horizontally
                   // Add background color for visualization
            },
            otp:{
            width:300
            },
             loadingText: {
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: 'white',

                        //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add opacity to the background color
                        padding: 5,
                        fontFamily: 'sans-serif'
                      },

});

export default SignIn;
