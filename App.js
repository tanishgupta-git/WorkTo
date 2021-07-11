import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import Login from './screens/login';
import Signup from './screens/signup';
import AddTodo from './screens/addtodo';
import Todo from './screens/todo';
import EditTodo from './screens/edittodo';


const Stack = createStackNavigator();

export default function App() {

  return (
// starting of the app
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
          <Stack.Screen name="Signup" options={{headerShown: false}} component={Signup}  />
          <Stack.Screen name="AddTodo" options={{  headerTitle:'AddTask',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}}  component={AddTodo} />
          <Stack.Screen name="EditTodo" options={{  headerTitle:'EditTask',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}} component={EditTodo} /> 
          <Stack.Screen name="Todo" options={{  headerTitle:'Task',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}} component={Todo} />         
          <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>

  );

}