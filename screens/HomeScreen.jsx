import React from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground,TouchableOpacity,Animated,ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const Home = ({navigation}) => {
  // Sample data of heritage sites
  const heritageSites = [
    { id: '1', title: 'Taj Mahal', image: require('./images/taj.jpg'),visitors:'>7 millions' },
    { id: '2', title: 'Khajuraho', image: require('./images/khaj.jpg'),visitors:'350000+' },
    { id: '3', title: 'Vaishno Devi', image: require('./images/vaishno.jpg'),visitors:'>8 millions' },
    { id: '4', title: 'Ajanta Caves', image: require('./images/ajanta.jpg'),visitors:'300000+' },
    // Add more heritage sites as needed
  ];




  // Custom list item component
  const HeritageSiteItem = ({ title, image,visitors }) => (
  <TouchableOpacity onPress={() => handlePress(title)}>
    <View style={styles.item}>
      <ImageBackground source={image} style={styles.imageBackground}>
       <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0.3, y: 0 }}
                style={styles.gradientOverlay}
              />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{visitors} visitors every year</Text>
      </ImageBackground>
    </View>
    </TouchableOpacity>
  );
   const handlePress = (title) => {
      // Add your press logic here, such as navigating to a detail screen
      navigation.navigate("NewTicket",{ data: title });
      console.log('Pressed:', title);
    };

     const handleQR = () => {
          // Add your press logic here, such as navigating to a detail screen
          navigation.navigate("QR");

        };


  // Render each heritage site item
  const renderHeritageSiteItem = ({ item }) => (
    <HeritageSiteItem title={item.title} image={item.image} visitors={item.visitors} />
  );

  return (
  <View style={{marginBottom:60}}>

  <Text style={styles.heading}>Select Your Destination</Text>
    <FlatList
      data={heritageSites}
      renderItem={renderHeritageSiteItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContent}
    />

     <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={handleQR}>

          </TouchableOpacity>
        </View>

    </View>
  );
};

const styles = StyleSheet.create({
gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
heading:{
    fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        // Add opacity to the background color
        padding: 10,
        marginTop:11

},
flatListContent: {
    paddingTop: 8, // Add top padding to the FlatList content
    paddingBottom: 8, // Add bottom padding to the FlatList content
    paddingLeft:14,
    paddingRight:14
  },
  item: {
    height: 200,
    marginVertical: 8,
    borderRadius: 16, // Add border radius for curvature
        overflow: 'hidden', // Clip overflow content
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft:10,
    // Add opacity to the background color
    padding: 10,
  },
  text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      marginLeft:10,
      // Add opacity to the background color
      padding: 10,
    },
     container: {
        position: 'absolute',
        bottom: 40, // Adjust as needed
        right: 40, // Adjust as needed
      },
      button: {
        backgroundColor: 'white', // Example color
        width: 60,
        height: 60,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default Home;
