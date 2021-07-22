import React from 'react';
import { View, Text,StyleSheet } from 'react-native';

const HistoryTasks = () => {
    return (
        <View style={styles.container}>
           <Text style={styles.headText}>Currently this fearure is in development mode</Text>
        </View>
    )
}

export default HistoryTasks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#3450A1',
        padding: 20
      },
    headText : {
       fontSize : 20,
       color: '#ffffff'
    }
})