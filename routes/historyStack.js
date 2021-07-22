import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryTasks from '../screens/historyTasks';


const Stack = createStackNavigator();

export default function HistoryStack(){
    return (

        
              <Stack.Navigator>
                  <Stack.Screen name="HistoryTasks" options={{headerShown: false}} component={HistoryTasks} />
              </Stack.Navigator>
          
          );
}