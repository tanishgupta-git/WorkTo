import React,{useEffect, useState} from 'react'
import { Alert, StyleSheet,View,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native'
import { db,auth } from '../firebase/config';
import { Text } from 'react-native-elements';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import styles from '../styles/detailTask';

export default function Task({route,navigation}) {
    const [task,setTask] = useState({title:"",description:"" });
    const [loading,setLoading] = useState(false);
    const { taskId,updateCheck=false } = route.params; 

    useEffect(() => {
        setLoading(true);
        const user = auth?.currentUser?.email;
        const date = moment(new Date()).format('DD-MMM-YYYY')
        db.collection('tasks').doc(user).collection(date).doc(taskId).get().then( doc => {
            setTask(doc.data());
            setLoading(false);
        }).catch( err => {
            Alert.alert("Error loading document");
        }) 

    },[updateCheck])


    const pressHandler = (key) => {

        
        const user = auth?.currentUser?.email;
        const date = moment(new Date()).format('DD-MMM-YYYY')

        db.collection('tasks').doc(user).collection(date).doc(key).delete().then(() => {
            navigation.navigate("Home");
        }).catch((error) => {
         console.error("Error removing document: ");
        });


       }
       
       
    return (
        <View style={styles.container}>
        {
                loading 
                 ?

                <View style={styles.loadingContainer}> 
                        <ActivityIndicator size="large" color='#A10CC9' />
                </View>

                :
                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.taskType}>{ task.tasktype}</Text>
                    <Text h2 h2Style={styles.taskHeading}>{task.title}</Text>
                    <Text style={styles.description}>{task.description}</Text>
                    { task.done 
                    ? 
                        <View style={styles.taskdoneContainer}>
                            <Ionicons name="checkmark-done-circle-outline" size={24} color="#c5cfec" /> 
                            <Text style={styles.taskdoneText}>Completed</Text>
                        </View> 
                        : 
                        <View style={styles.taskdoneContainer}>
                        <AntDesign name="exclamationcircleo" size={24} color="#c5cfec" />
                        <Text style={styles.taskdoneText}>Not Completed</Text>
                        </View>
                    }
                    <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.taskDelete} onPress={() => pressHandler(taskId)}><Text style={styles.taskDeletetext} >Delete Task</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.taskDelete} onPress={() => navigation.navigate('AddEditTask',{ taskId,updateCheck,editTrue:true })}><Text style={styles.taskDeletetext} >Edit Task</Text></TouchableOpacity>
                    </View> 
                </ScrollView>
             }

        </View>
    )
}
