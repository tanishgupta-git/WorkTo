import React from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer'
import { Entypo,FontAwesome } from '@expo/vector-icons';


const DrawerContent = (props) => {
        const { state } = props
        const { routes, index } = state; 
        const focusedRoute = routes[index].name; // this is the active route
    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
            <View style={styles.drawerLogoContainer}>
                <Image style={styles.drawerLogo} source={require('../assets/worktologo.png')} />
            </View>
            <View>
                        <DrawerItem 
                            inactiveTintColor="#98ade7"
                            activeTintColor="#ffffff"
                            activeBackgroundColor='#3450A1'
                            focused={focusedRoute == 'Home'}
                            labelStyle={styles.drawerlabel}
                            icon={({color, size}) => (
                                <Entypo name="home" 
                                     size={size} 
                                     color={color}     
                                />
                            
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                            style={styles.drawerItem}
                        />
                        <DrawerItem 
                            inactiveTintColor="#98ade7"
                            activeTintColor="#ffffff"
                            activeBackgroundColor='#3450A1'
                            labelStyle={styles.drawerlabel}
                            style={styles.drawerItem}
                            focused={focusedRoute == 'HistoryTasks'}
                            activeBackgroundColor='#3450A1'
                            icon={({color, size}) => (
                                 <FontAwesome name="history" 
                                     size={size} 
                                     color={color} 
                                     />
                            )}
                            label="HistoryTasks"
                            onPress={() => {props.navigation.navigate('HistoryTasks')}}
                        />
            </View>
            </DrawerContentScrollView>

        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({
    drawerlabel : {
        fontSize:22
    },
    drawerContent : {
      flex: 1,
      backgroundColor:'#041955'
    }, 
    drawerLogoContainer :{
        alignItems:'center',
        padding: 15
    },
    drawerLogo : {
        width: 120,
        height: 120,
        resizeMode :'contain'
    },
    drawerItem : {
        justifyContent:'center',
        padding: 5
    }
})
