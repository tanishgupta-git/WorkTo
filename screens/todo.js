import React,{useEffect, useState} from 'react'
import { Alert, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { db } from '../firebase/config';

export default function Todo({route,setTodos}) {
    const [todo,setTodo] = useState({title:"",description:"" });
    const { todoId } = route.params; 
    useEffect(() => {
       db.collection('todos').doc(todoId).get().then( doc => {
           setTodo(doc.data())
       }).catch( err => {
           Alert.alert(err);
       })
    },[todoId])


    const pressHandler = (key) => {
        db.collection("todos").doc(key).delete().then(() => {
            setTodos(todos.filter( todo => todo.key !== key));
        }).catch((error) => {
         console.error("Error removing document: ", error);
     });
       }
       
       
    return (
        <View>
            <Text>{todo.title}</Text>
            <TouchableOpacity onPress={() => pressHandler(todoId)}><Text>Delete Me</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})