import React,{ useState,useEffect } from 'react';
import { View, Text,StyleSheet,Alert } from 'react-native';
import { auth,db  } from '../firebase/config';
import Header from '../components/header';



const HistoryTasks = ({navigation}) => {

    const [tasksDate,setTasksDate] = useState([]);
    
    useEffect(() => {
        const user = auth?.currentUser?.email;

        db.collection('todos').doc(user).collection("dates").get().then((snapshot) => {
           setTasksDate(snapshot.docs.map( doc => doc.id))
        }).catch((err) => {
            Alert.alert("Error while loading history");
            console.log(err);
        })
    },[])

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {
                tasksDate.map( taskDate => (
                    <Text key={taskDate}>{taskDate}</Text>
                ))
            }

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