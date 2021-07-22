import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import Signup from './screens/signup';
import DrawerNavigator from './routes/drawer';

const Stack = createStackNavigator();

export default function App() {

  return (
    // starting of the app
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
              <Stack.Screen name="Signup" options={{headerShown: false}} component={Signup}  />      
              <Stack.Screen name="Home" options={{headerShown: false}} component={DrawerNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
    
      );
}