import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import Task from '../screens/task';
import AddEditTask from '../screens/addEditTask';

const Stack = createStackNavigator();

export default function HomeStack(){
    return (
        // starting of the app
         
              <Stack.Navigator>
                    <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
                    <Stack.Screen name="AddEditTask" options={{ headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}}  component={AddEditTask} />
                    <Stack.Screen name="Task" options={{  headerTitle:'Task',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}} component={Task} />
              </Stack.Navigator>
       
        
          );
}