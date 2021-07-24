import React,{useEffect, useState} from 'react'
import { Alert, StyleSheet,View,TouchableOpacity,ScrollView,ActivityIndicator} from 'react-native'
import { db,auth } from '../firebase/config';
import { Text } from 'react-native-elements';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import moment from 'moment';


export default function Todo({route,navigation}) {
    const [todo,setTodo] = useState({title:"",description:"" });
    const [loading,setLoading] = useState(false);
    const { todoId,updateCheck=false } = route.params; 

    useEffect(() => {
        setLoading(true);
        const user = auth?.currentUser?.email;
        const date = moment(new Date()).format('DD-MMM-YYYY')
        db.collection('todos').doc(user).collection(date).doc(todoId).get().then( doc => {
            setTodo(doc.data());
            setLoading(false);
        }).catch( err => {
            Alert.alert("Error loading document");
        }) 

    },[updateCheck])


    const pressHandler = (key) => {

        
        const user = auth?.currentUser?.email;
        const date = moment(new Date()).format('DD-MMM-YYYY')

        db.collection('todos').doc(user).collection(date).doc(key).delete().then(() => {
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
                    <Text style={styles.todoType}>{ todo.tasktype}</Text>
                    <Text h2 h2Style={styles.todoHeading}>{todo.title}</Text>
                    <Text style={styles.description}>{todo.description}</Text>
                    { todo.done 
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
                            <TouchableOpacity style={styles.todoDelete} onPress={() => pressHandler(todoId)}><Text style={styles.todoDeletetext} >Delete Task</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.todoDelete} onPress={() => navigation.navigate('EditTodo',{ todoId,updateCheck })}><Text style={styles.todoDeletetext} >Edit Task</Text></TouchableOpacity>
                    </View> 
                </ScrollView>
             }

        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:'#3450A1',
        paddingBottom:20
    },
    scrollContainer :{
        padding: 20
    },
    todoHeading : {
         color: '#ffffff'
    },
    description : {
        color: '#c5cfec',
        fontSize:20,
        marginVertical:20
    },
    todoType : {
        borderWidth : 1,
        borderColor : '#c5cfec',
        padding: 10,
        textAlign : 'center',
        width: 130,
        fontSize:19,
        borderRadius : 20,
        color: '#c5cfec',
        marginVertical : 20
    },
    todoDelete : {
        width: 150,
        padding: 10,
        backgroundColor:'#A10CC9',
        borderRadius:5
      },
      todoDeletetext : {
        color: '#c5cfec',
        fontSize:18,
        textAlign:'center',
        flexDirection: 'row',
        alignItems :'center'
      },
      taskdoneText : {
          color: '#c5cfec',
          marginLeft: 10,
          fontSize:18,
          marginVertical :10
      },
      taskdoneContainer : {
         flexDirection : 'row',
         alignItems : 'center'
      },
      buttonContainer : {
         marginVertical : 20,
         flexDirection : 'row',
         justifyContent : 'space-around' 
      },
      loadingContainer : {
        flex: 1,
        justifyContent:'center',
        alignItems : 'center'
      }              
})