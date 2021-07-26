import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,ScrollView,TouchableOpacity,ActivityIndicator} from 'react-native'
import { db,auth } from '../firebase/config'
import { Ionicons,AntDesign,MaterialIcons } from '@expo/vector-icons';

const TasksDateHistory = ({route,navigation}) => {

    const [tasks,setTasks] = useState([]);
    const { taskDate } = route.params;

    useEffect(() => {
        const user = auth?.currentUser?.email;
       
        const unsubscribe = db.collection('tasks').doc(user).collection(taskDate).orderBy('timeStamp','desc').onSnapshot( snapshot => {
            setTasks(snapshot.docs.map( doc => ({
                id:doc.id,
                ...doc.data()
            })))
        })
      
        return () => unsubscribe();

    },[])

    return (
        <ScrollView style={styles.container}>
            
            <View style={styles.list}>
                    <Text style={styles.listHeading}>Tasks</Text>
                    { tasks.length ? 
                        tasks.map( task => (
                            <View  style={styles.item} key={task.id}>
                                    { task.done ?           
                                    <Ionicons name="checkmark-done-circle-outline" size={24} color='#acbdec' />               
                                    : 
                                    <AntDesign name="exclamationcircleo" size={24} color='#acbdec' />
                                    }
                                   <Text style={styles.itemText}>{task.title}</Text>
                                   <TouchableOpacity style={styles.detailHistory} onPress={ () =>  navigation.navigate('DateHistory',{
                                       date:taskDate,
                                       taskId : task.id
                                   }) }>
                                            <MaterialIcons name="arrow-forward-ios" size={24} color="#A10CC9" />
                                   </TouchableOpacity>
                          </View>
                        ))
                        :
                        <Text style={styles.containerText}>No task for the day</Text> 
                    }

              
          

            </View>
        </ScrollView>
    )
}

export default TasksDateHistory

const styles = StyleSheet.create({
   container : {
    backgroundColor:'#3450A1',
    paddingBottom:20
   },
   list : {
    marginVertical : 20,
    alignItems:'center'
  },
  item : {
    flexDirection:'row',
    backgroundColor:'#041955',
    padding :20,
    margin: 10,
    width: '90%',
    borderWidth:1,
    borderColor:'transparent',
    borderRadius:20
 },
 itemText : {
     marginLeft:20,
     fontSize:20,
     color:'#acbdec'
 },
  listHeading : {
    color: '#98ade7',
    marginVertical:5,
    fontSize:20
  },
  detailHistory : {
    position:'absolute',
    right: 10,
    top:20
 },
 containerText :{
     textAlign :'center',
     marginVertical : 20,
     fontSize :20,
     color : '#acbdec'
 }
})
