import React,{useEffect, useState} from 'react'
import { Alert, StyleSheet,View,TouchableOpacity } from 'react-native'
import { db,auth } from '../firebase/config';
import { Text } from 'react-native-elements';
export default function Todo({route,setTodos,navigation,todos}) {
    const [todo,setTodo] = useState({title:"",description:"" });
    const { todoId } = route.params; 
    useEffect(() => {

        const user = auth?.currentUser?.email;
        const DateObject = new Date();
        const date = DateObject.getDate().toString() + DateObject.getMonth().toString() + DateObject.getFullYear().toString();

        db.collection('todos').doc(user).collection(date).doc(todoId).get().then( doc => {
            setTodo(doc.data())
        }).catch( err => {
            Alert.alert(err);
        })
        
    },[todoId])


    const pressHandler = (key) => {
        const user = auth?.currentUser?.email;
        const DateObject = new Date();
        const date = DateObject.getDate().toString() + DateObject.getMonth().toString() + DateObject.getFullYear().toString();

        db.collection('todos').doc(user).collection(date).doc(key).delete().then(() => {
            setTodos(todos.filter( todo => todo.key !== key));
            navigation.navigate("Home");
        }).catch((error) => {
         console.error("Error removing document: ", error);
     });
       }
       
       
    return (
        <View style={styles.container}>
            <Text h2 h2Style={styles.todoHeading}>{todo.title}</Text>
            <Text style={styles.description}>{todo.description}</Text>
            <TouchableOpacity onPress={() => pressHandler(todoId)}><Text style={styles.todoDelete}>Delete Me</Text></TouchableOpacity>
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