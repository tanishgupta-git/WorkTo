import React,{useState} from 'react';
import { StyleSheet,View, TextInput,TouchableOpacity, Alert,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import { auth,db } from '../firebase/config';
import firebase from 'firebase';


export default function AddTodo({navigation,setTodos,todos}){
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");


    const submitHandler = () => {
          if (!title.length || !description.length) {
            Alert.alert("Both the fields are required");
            return;
          }
          if (title.length < 3) {
            Alert.alert("Title must be greater than 5 characters");
            return;
          }
          if (description.length < 10) {
            Alert.alert("Description must be greater than 10 characters");
            return;
          }
          const user = auth?.currentUser?.email;
          const DateObject = new Date();
          const date = DateObject.getDate().toString() + DateObject.getMonth().toString() + DateObject.getFullYear().toString();
          if (user && date) {

            db.collection('todos').doc(user).collection(date).add({
                title,
                description,
                done : false,
                timeStamp : firebase.firestore.FieldValue.serverTimestamp()
              }).then( (docRef) => {
      
              setTodos([{key:docRef.id,title:title,done:false },...todos]);
              navigation.navigate("Home");

              }).catch( (error) => {
                Alert.alert("Error adding task");
            })

      }else {
        Alert.alert("Error adding task");
      } 
      }

    return (
      <TouchableWithoutFeedback onPress={()=> {
        Keyboard.dismiss();
      }}>
        <View style={styles.container}>
          <TextInput style={styles.input}
              placeholder="title" 
              underlineColorAndroid="transparent"
              placeholderTextColor='#8b9fda'
              onChangeText={(value) => setTitle(value)}
              value={title}
          />
          <TextInput style={styles.textArea}
              placeholder="description" 
              multiline = {true} 
              underlineColorAndroid="transparent" 
              numberOfLines = {10}  
              placeholderTextColor='#8b9fda'
              onChangeText={(value) => setDescription(value)}
              value={description}
          />  

        <View style={styles.addTaskButtonContainer}>
              
              <TouchableOpacity><Button onPress={submitHandler}  title='Add Task' buttonStyle={styles.addButton}/></TouchableOpacity> 
        </View>
        </View>
    </TouchableWithoutFeedback>
   )    
}

const styles = StyleSheet.create({
   container : {
      backgroundColor : '#3450A1',
      padding: 15,
      flex: 1,
      justifyContent:'center'
   }, 
    input : {
        marginVertical:20,
        padding: 15,
        fontSize:19,
        color:'#c5cfed',
        backgroundColor:'#253974',
        borderRadius : 4
    },
    addTaskButtonContainer:{
      alignItems:'center',
      marginVertical:20
    },
    addButton : {
      width: 150,
      padding: 10,
      backgroundColor:'#A10CC9'
    } ,
    textArea: {
      height:200,
      textAlignVertical:'top',
      marginVertical:20,
      padding: 15,
      fontSize:19,
      color:'#c5cfed',
      backgroundColor:'#253974',
      borderRadius : 4
    }
})