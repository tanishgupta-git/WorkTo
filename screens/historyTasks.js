import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Header from '../components/header';


const HistoryTasks = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
           <Text style={styles.headText}>Currently this fearure is in development mode</Text>
        </View>
    )
}

export default HistoryTasks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#3450A1'
      },
    headText : {
       fontSize : 20,
       color: '#ffffff',
       margin: 20
    }
})