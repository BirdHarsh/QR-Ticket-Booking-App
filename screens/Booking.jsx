import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet,ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';


const BookingScreen = () => {



  const [collectionCData, setCollectionCData] = useState([]);

   useEffect(() => {
     fetchCollectionCData();
   }, []);

   const fetchCollectionCData = async () => {
    const currentUser = auth().currentUser;
         const uid = currentUser.uid;
     try {
       const collectionCRef = firestore().collection('users').doc('booking').collection(uid);
       const snapshot = await collectionCRef.get();

       const data = snapshot.docs.map(doc => {
         return {
           id: doc.id,
           entries: doc.data().Entries,
           date: moment(doc.data().Date.toDate()).format('YYYY-MM-DD'),
           location: doc.data().Location
         };
       });

       setCollectionCData(data);
     } catch (error) {
       console.error('Error fetching Collection C data:', error);
     }
   };

   const renderItem = ({ item }) => (
     <View style={styles.item}>
      <ImageBackground source={require('./images/ticket.png')} style={styles.imageBackground}>
      <View style={styles.Tdetails}>
       <Text style={styles.heading}>{item.location}</Text>
       <Text style={styles.Date}>Date: {item.date}</Text>
        <Text style={styles.text}>Entries: {item.entries}</Text>


             </View>



                     </ImageBackground >

     </View>
   );

  return (
    <View style={styles.container}>
       <FlatList
            data={collectionCData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContent}
          />
    </View>
  );
};

const styles = StyleSheet.create({


heading:{
fontSize:40,
 fontWeight: 'bold',
        color: 'black',

},

Date:{
fontSize:15,
 fontWeight: 'bold',
        color: 'black',
        marginTop:10,

},

Tdetails:{
padding:12


},



  container: {
    flex: 1,

  },

    flatListContent: {


    },


   item: {
      padding:10,

    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      }
    ,
      text: {
        color: '#000000',
        fontSize: 16,
        marginBottom: 8,
      },
});

export default BookingScreen;
