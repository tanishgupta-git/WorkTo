import React from 'react'
import { StyleSheet, Text, View ,ScrollView} from 'react-native'

const TasksDateHistory = () => {
    return (
        <ScrollView style={styles.container}>
            <Text>Currently in a development mode.</Text>
        </ScrollView>
    )
}

export default TasksDateHistory

const styles = StyleSheet.create({
   container : {
    backgroundColor:'#3450A1',
    paddingBottom:20
   }
})
