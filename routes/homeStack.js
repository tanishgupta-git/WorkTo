import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import AddTask from '../screens/addTask';
import EditTask from '../screens/editTask';
import Task from '../screens/task';

const Stack = createStackNavigator();

export default function HomeStack(){
    return (
        // starting of the app
         
              <Stack.Navigator>
                    <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
                    <Stack.Screen name="AddTask" options={{  headerTitle:'AddTask',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}}  component={AddTask} />
                    <Stack.Screen name="EditTask" options={{  headerTitle:'EditTask',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}} component={EditTask} /> 
                    <Stack.Screen name="Task" options={{  headerTitle:'Task',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}} component={Task} />
              </Stack.Navigator>
       
        
          );
}