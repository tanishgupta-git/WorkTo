import React,{useState} from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity,View } from 'react-native';
import { Entypo,AntDesign,MaterialIcons} from '@expo/vector-icons';
import { db,auth } from '../firebase/config';


export default function TodoItem({ item,pressHandler,setTodos}){
 const [done,Setdone] = useState(item.done);
 const colorItem = {
     Business : '#657fcd',
     Personal : '#A10CC9',
     Other    : '#3399ff'
 }
 const doneHandler = () => {
      const user = auth?.currentUser?.email;
      const DateObject = new Date();
      const date = DateObject.getDate().toString() + (DateObject.getMonth() + 1).toString() + DateObject.getFullYear().toString();


       // here is item.key is the id of firebase document
       db.collection('todos').doc(user).collection(date).doc(item.key).update({
           done : !done
       }).then(() => {
           Setdone(prev => !prev);
           setTodos( prev =>  prev.map( todo => { 
               if (todo.key === item.key){
                 todo.done = !done;   
               }
               return todo;
             }) );
       }).catch(() => {
           Alert.alert("Error while updating");
       })
 }
 
  return (
   
          <View style={styles.item}>
           { done ?
             ( <TouchableOpacity onPress={doneHandler} >
               <AntDesign name="checkcircle" size={24} color={colorItem[item.tasktype]} />
               </TouchableOpacity>
             )
                :
            ( <TouchableOpacity onPress={doneHandler} >
               <Entypo name="circle" size={24} color={colorItem[item.tasktype]} />
            </TouchableOpacity>
            )
           }
            <Text style={done ?  styles.itemDonetext : styles.itemText}>{ item.title }</Text>
            <TouchableOpacity style={styles.deleted} onPress={() => pressHandler(item.key)}>
                <MaterialIcons name="arrow-forward-ios" size={24} color={colorItem[item.tasktype]} />
            </TouchableOpacity>
          </View>
  )
}

const styles  = StyleSheet.create({
    item : {
        flexDirection:'row',
        padding:20,
        paddingRight:50,
        paddingLeft:15,
        marginTop:10,
        borderWidth:1,
        borderColor:'transparent',
        borderRadius:20,
        backgroundColor:'#041955',
        alignItems:'center'
    },
    itemText:{
        marginLeft:10,
        fontSize:18,
        color:'#acbdec'
    },
    itemDonetext : {
        marginLeft:10,
        fontSize:18,
        color:'#829ce3',
        textDecorationLine:'line-through'
    },
    deleted : {
     position:'absolute',
     right: 10,
     top:20
    }
})