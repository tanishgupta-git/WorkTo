import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HistoryTasks from '../screens/historyTasks';
import TasksDateHistory from '../screens/tasksDateHistory';


const Stack = createStackNavigator();

export default function HistoryStack(){
    return (

        
              <Stack.Navigator>
                  <Stack.Screen name="HistoryTasks" options={{headerShown: false}} component={HistoryTasks} />
                  <Stack.Screen name="TasksDateHistory" options={{  headerTitle:'TaskHistory',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}} component={TasksDateHistory} />
              </Stack.Navigator>
          
          );
}