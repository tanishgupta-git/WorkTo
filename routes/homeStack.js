import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import AddTodo from '../screens/addtodo';
import EditTodo from '../screens/edittodo';
import Todo from '../screens/todo';

const Stack = createStackNavigator();

export default function HomeStack(){
    return (
        // starting of the app
         
              <Stack.Navigator>
                    <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
                    <Stack.Screen name="AddTodo" options={{  headerTitle:'AddTask',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}}  component={AddTodo} />
                    <Stack.Screen name="EditTodo" options={{  headerTitle:'EditTask',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}} component={EditTodo} /> 
                    <Stack.Screen name="Todo" options={{  headerTitle:'Task',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}} component={Todo} />
              </Stack.Navigator>
       
        
          );
}