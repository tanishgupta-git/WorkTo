import React,{useState,useEffect} from 'react'
import { View ,TouchableOpacity,ActivityIndicator,ScrollView} from 'react-native';
import { Text } from 'react-native-elements';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import { db,auth } from '../firebase/config';
import styles from '../styles/detailTask';

const DateHistory = ({route,navigation}) => {

    const [task,setTask] = useState({title:"",description:"" });
    const [loading,setLoading] = useState(false);
    const { date,taskId } = route.params; 

    useEffect(() => {
        setLoading(true);
        const user = auth?.currentUser?.email;
        db.collection('tasks').doc(user).collection(date).doc(taskId).get().then( doc => {
            setTask(doc.data());
            setLoading(false);
        }).catch( err => {
            Alert.alert("Error loading document");
        }) 

    },[])


    const pressHandler = () => {
     
        const user = auth?.currentUser?.email;

        db.collection('tasks').doc(user).collection(date).doc(taskId).delete().then(() => {
            navigation.navigate('TasksDateHistory',{ taskDate:taskId})
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
                            <TouchableOpacity style={styles.taskDelete} onPress={pressHandler}>
                                <Text style={styles.taskDeletetext} >Delete</Text>
                            </TouchableOpacity>
                    </View>
                </ScrollView>
             }

        </View>
    )
}

export default DateHistory
