import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import HomeStack from './homeStack';
import HistoryStack from './historyStack';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
   
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeStack} />
          <Drawer.Screen name="HistoryTasks" component={HistoryStack} />
        </Drawer.Navigator>

    );
  }