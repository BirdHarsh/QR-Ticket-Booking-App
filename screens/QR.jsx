// BookingScreen.js

import React , {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-qr-code';

const QrScreen = () => {

 const [text, setText] = useState('1234567');
  const qr = '123456656';

  return (
    <View style={styles.container}>
    <QRCode
            size={256}
            style={{height: 'auto', maxWidth: '100%', width: '100%'}}
            value={text}
            viewBox={`0 0 256 256`}
          />
      <Text style={styles.title}>Booking Screen</Text>
      <Text style={styles.text}>This is the booking screen.</Text>
      {/* Add booking form or other components as needed */}

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
});

export default QrScreen;
