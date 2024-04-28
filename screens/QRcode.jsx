import React, {useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import QRCode from 'react-qr-code';

const App = () => {
  const [text, setText] = useState('1234567');
  const qr = '123456656';
  return (
    <View>
      <QRCode
        size={256}
        style={{height: 'auto', maxWidth: '100%', width: '100%'}}
        value={qr}
        viewBox={`0 0 256 256`}
      />
    </View>
  );
};

export default App;
