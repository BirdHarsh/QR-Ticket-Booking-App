import React from 'react';
import "react-native-gesture-handler";
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./screens/SignInpage"
import OtpInput from "./screens/OTPEnter"

const Stack=createStackNavigator();
const App=()=>{

return(

<NavigationContainer>
    <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{headerShown:false}}
                    />
        <Stack.Screen
                    name="OtpEnter"
                    component={OtpEnter}
                    options={{headerShown:false}}
                    />
        <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{headerShown:false}}
                    />

    </Stack.Navigator>
</NavigationContainer>

);


};

export default App;