import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import Signup from './screens/signup';
import DrawerNavigator from './routes/drawer';
import OnBoardingScreen from './screens/onBoardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

export default function App() {
  const [firstLaunch,setFirstLaunch] = useState(null);

  useEffect(() => {
     AsyncStorage.getItem('alreadyLaunchedWorkToApp').then( value => {

       if( value === null) {
         AsyncStorage.setItem('alreadyLaunchedWorkToApp','true');
         setFirstLaunch(true);
       }else{
         setFirstLaunch(false);
       }
     })
  },[])
  if (firstLaunch === null) {
   return null
  }else if( firstLaunch === true) {
    return (
      // starting of the app
          <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="OnBoardingScreen" options={{headerShown: false}} component={OnBoardingScreen} />
                <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
                <Stack.Screen name="Signup" options={{headerShown: false}} component={Signup}  />      
                <Stack.Screen name="Home" options={{headerShown: false}} component={DrawerNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
      
        )
  }else{

    return (
        // starting of the app
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
              <Stack.Screen name="Signup" options={{headerShown: false}} component={Signup}  />      
              <Stack.Screen name="Home" options={{headerShown: false}} component={DrawerNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
}