import React,{useState} from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity,View } from 'react-native';
import { Entypo,AntDesign,MaterialIcons} from '@expo/vector-icons';
import { db,auth } from '../firebase/config';
import moment from 'moment';

export default function TaskItem({ item,pressHandler,setTasks}){
 const [done,Setdone] = useState(item.done);
 const colorItem = {
     Business : '#657fcd',
     Personal : '#A10CC9',
     Other    : '#3399ff'
 }
 const doneHandler = () => {
      const user = auth?.currentUser?.email;
     
      const date = moment(new Date()).format('DD-MMM-YYYY')

       // here is item.key is the id of firebase document
       db.collection('tasks').doc(user).collection(date).doc(item.key).update({
           done : !done
       }).then(() => {
           Setdone(prev => !prev);
           setTasks( prev =>  prev.map( task => { 
               if (task.key === item.key){
                 task.done = !done;   
               }
               return task;
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
            <TouchableOpacity style={styles.taskDetailButton} onPress={() => pressHandler(item.key)}>
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
    taskDetailButton : {
     position:'absolute',
     right: 10,
     top:20
    }
})