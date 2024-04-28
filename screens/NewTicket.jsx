import React, { useEffect, useState } from 'react';
import { View, Text, Button,FlatList, TouchableOpacity, StyleSheet,Alert,ActivityIndicator,Modal,ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/auth';
import DatePicker from 'react-native-date-picker';
import CounterInput from 'react-native-counter-input';
import auth from '@react-native-firebase/auth';
import { useNavigation, useRoute } from "@react-navigation/native";

const NewTicket = ({ route }) => {


const { data } = route.params;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const currentDate = new Date();
  const maximumDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
  const collection =

  useEffect(() => {

  }, []);

  const [Loading, setLoading] = useState(false);
    const toggleLoading = () => {
        setLoading(!Loading);
      };


  const handleSignOut = () => {
    firebase.auth().signOut();
  };



  const handleDateChange = (date) => {
      date(date);
    };


// booking ticket

//coverting date
const formatDateToString = (date) => {
  const day = date.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if needed
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get the month (zero-based) and pad with leading zero if needed
  const year = date.getFullYear().toString(); // Get the full year

  return `${day}${month}${year}`;
};


const dateString = formatDateToString(date);



//creating  collection and data





  const handleCreateDocumentD = async () => {

  setLoading(true)

  const currentUser = auth().currentUser;
    const uid = currentUser.uid;
    try {


     const collectionA = firestore().collection('users');

          // Reference Document B inside Collection A
          const documentB = collectionA.doc('booking');

          // Create Collection C inside Document B
          await documentB.collection(uid).doc().set({
            // Add initial data to Document D if needed
         Entries: count,
         Date:date,
         Location:data
          });

      // Reference Collection A
      const collectionARef = firestore().collection('tickets');
      // Reference Document B inside Collection A
      const documentBRef = collectionARef.doc(data);

      // Check if Collection C exists inside Document B
      const collectionCQuery = await documentBRef.collection(dateString).limit(1).get();


      if (collectionCQuery.empty) {
        // Collection C does not exist, create it and then create Document D
        await documentBRef.collection(dateString).doc(uid).set({
          // Add initial data to Document D if needed
          Entries: count
        });

        setLoading(false)

        Alert.alert('TICKET BOOKED SUCCESSFULLY1');

      } else {
        // Collection C already exists, directly create Document D inside it
        await documentBRef.collection(dateString).doc(uid).set({
          // Add initial data to Document D if needed
          Entries: count
        });
        setLoading(false)
        Alert.alert('TICKET BOOKED SUCCESSFULLY2');


      }
    } catch (error) {
       setLoading(false);
      console.error('Error creating Document D:', error);
      Alert.alert('Error', 'Failed to create Document D. Please try again later.');
    }
  };










  return (
    <View style={styles.container}>
    <Text style={styles.title2}>Book Your Ticket To:</Text>
      <Text style={styles.title}>{data}</Text>

        <DatePicker

        mode="date"
        onDateChange={handleDateChange}
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          minimumDate={currentDate} // Set minimum date to present

        />

                 <View style={styles.Horizontalcontainer}>
                 <View>
                 <Text style={[styles.selectText,{marginBottom:70}]}>Visitors</Text>

                 <Text style={styles.selectText}>Select Date</Text>
                 </View>
                 <View style={{marginLeft:20}}>
                  <CounterInput
                        style={styles.counter}
                        inputStyle={styles.input}
                               initialValue={count}
                               onChange={(value) => setCount(value)}
                               increaseButtonBackgroundColor="#007bff"
                               decreaseButtonBackgroundColor="#007bff"
                               buttonTextStyle={{ color: 'white' }}
                               min={1}
                               max={10}
                               horizontal={true}
                             />


                                     <TouchableOpacity style={styles.DateButton} onPress={() => setOpen(true)}>
                                          <Text style={styles.DateText}>{date.toDateString()}</Text>
                                        </TouchableOpacity>


                 </View>
                </View>
                <View style={styles.item}>
                <ImageBackground source={require('./images/ticket.png')} style={styles.imageBackground}>



                </ImageBackground >
                </View>



                  <View style={styles.BookButton}>

                  <TouchableOpacity style={styles.BookButton} onPress={handleCreateDocumentD}>
                                                            <Text style={styles.DateText}>Book Ticket</Text>
                                                          </TouchableOpacity>
                  </View>


              <Modal
                                                        animationType="slide"
                                                        transparent={true}
                                                        visible={Loading}
                                                        onRequestClose={toggleLoading}
                                                      >
                                                      <View style={styles.modalContainer}>

                                                      <ActivityIndicator size="large" color="white" />
                                                      <Text style={styles.loadingText}>Booking in Progress</Text>
                                                      </View>

                               </Modal>


    </View>
  );
};

export default NewTicket;


const styles = StyleSheet.create({
 item: {width:310,
    height: 125,
    marginVertical: 8,
     // Add border radius for curvature
        overflow: 'hidden', // Clip overflow content
        marginBottom:20,

  },
imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add opacity to the background color

    fontFamily: 'sans-serif',
    marginBottom:40
  },
   title2: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add opacity to the background color
      padding: 10,
      fontFamily: 'sans-serif',
      marginTop:10
    },
  selectText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',

      //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add opacity to the background color
      padding: 5,
      fontFamily: 'sans-serif'
    },
    loadingText: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',

            //backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add opacity to the background color
            padding: 5,
            fontFamily: 'sans-serif'
          },

  container:{
   flex: 1,
     // Horizontal layout
      alignItems: 'center', // Center horizontally
       // Center vertically
  },

  Horizontalcontainer:{
        marginTop: 20,
        marginBottom: 40,
        flexDirection: 'row',// Horizontal layout
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically

    },

   DateButton: {
      backgroundColor: '#007bff', // Button background color
      paddingVertical: 10, // Vertical padding
      paddingHorizontal: 20, // Horizontal padding
      borderRadius: 20, // Border radius to create rounded corners
      height:70,
      alignItems: 'center', // Center horizontally
      justifyContent: 'center',
    },
    DateText: {
      color: '#fff', // Button text color
      fontSize: 16, // Button text font size
      fontWeight: 'bold', // Button text font weight
      textAlign: 'center', // Center text horizontally
    },
    BookButton: {
          backgroundColor: 'black', // Button background color
          paddingVertical: 10, // Vertical padding
          paddingHorizontal: 20, // Horizontal padding
          borderRadius: 5, // Border radius to create rounded corners
          height:50,
          width:260,
          alignItems: 'center', // Center horizontally
          justifyContent: 'center',


        },

  counter:{
  fontSize: 10,
  fontSize: 24,
  marginBottom:30
  },
   input: {
      fontSize: 5,
      // Adjust the font size of the input text
    },
     modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
          padding: 20,
        },


  })