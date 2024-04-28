import React, {useEffect, useState} from 'react';
import "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./screens/SignInpage";
import OtpEnter from "./screens/OTPEnter";
import ProfileScreen from "./screens/ProfileScreen";
import Home from "./screens/HomeScreen"
import BookingScreen from "./screens/Booking"
import NewTicket from "./screens/NewTicket"
import QrScreen from "./screens/QR.jsx"
import auth from '@react-native-firebase/auth';
import {initializeApp} from '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/app';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack=createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home1" component={Home} options={{ headerShown: false }} />
    <Stack.Screen name="NewTicket" component={NewTicket} options={{ headerShown: false }}  />
    <Stack.Screen name="QR" component={QrScreen} options={{ headerShown: false }}  />
  </Stack.Navigator>
);


const App=()=>{

const [user, setUser] = useState(null);
useEffect(() => {

    initializeApp();

    firebase.initializeApp({
          // Your Firebase config here
        });

        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
              setUser(user);
            });

            return unsubscribe;
  }, []);





return(



<NavigationContainer>



      {user ? (
              <Tab.Navigator>
                        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false, }}  />
                        <Tab.Screen name="Booking" component={BookingScreen} options={{ headerShown: false }}  />
                        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}  />
                      </Tab.Navigator>
            ) : (
              <SignIn/>
            )}







</NavigationContainer>

);


};

export default App;