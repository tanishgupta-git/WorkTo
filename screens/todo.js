import React,{useEffect, useState} from 'react'
import { Alert, StyleSheet,View,TouchableOpacity,ScrollView } from 'react-native'
import { db,auth } from '../firebase/config';
import { Text } from 'react-native-elements';
import { Ionicons,AntDesign } from '@expo/vector-icons';




export default function Todo({route,navigation}) {
    const [todo,setTodo] = useState({title:"",description:"" });
    const { todoId,updateCheck=false } = route.params; 
    useEffect(() => {

        const user = auth?.currentUser?.email;
        const DateObject = new Date();
        const date = DateObject.getDate().toString() + (DateObject.getMonth() + 1).toString() + DateObject.getFullYear().toString();
        db.collection('todos').doc(user).collection(date).doc(todoId).get().then( doc => {
            setTodo(doc.data())
        }).catch( err => {
            Alert.alert(err);
        }) 

    },[updateCheck])


    const pressHandler = (key) => {
        const user = auth?.currentUser?.email;
        const DateObject = new Date();
        const date = DateObject.getDate().toString() + (DateObject.getMonth() + 1).toString() + DateObject.getFullYear().toString();

        db.collection('todos').doc(user).collection(date).doc(key).delete().then(() => {
            navigation.navigate("Home");
        }).catch((error) => {
         console.error("Error removing document: ", error);
     });
       }
       
       
    return (
        <ScrollView style={styles.container}>
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
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:'#3450A1' ,
        padding:20
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
      } 
})