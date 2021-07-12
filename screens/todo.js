import React,{useEffect, useState} from 'react'
import { Alert, StyleSheet,View,TouchableOpacity } from 'react-native'
import { db,auth } from '../firebase/config';
import { Text } from 'react-native-elements';
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
        <View style={styles.container}>
            <Text h2 h2Style={styles.todoHeading}>{todo.title}</Text>
            <Text style={styles.description}>{todo.description}</Text>
            <Text>{ todo.done ? 'Completed' : 'Not Completed'}</Text>
            <TouchableOpacity onPress={() => pressHandler(todoId)}><Text style={styles.todoDelete}>Delete Task</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('EditTodo',{ todoId,updateCheck })}><Text style={styles.todoDelete}>Edit Task</Text></TouchableOpacity>
        </View>
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
    todoDelete : {
        width: 150,
        padding: 10,
        backgroundColor:'#A10CC9',
        textAlign:'center',
        color: '#c5cfec',
        fontSize:18,
        borderRadius:5
      } 
})