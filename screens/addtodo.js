import React,{useState} from 'react';
import { View, TextInput,TouchableOpacity, Alert,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import { auth,db } from '../firebase/config';
import firebase from 'firebase';
import styles from '../styles/form';

export default function AddTodo({navigation}){
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
          const date = DateObject.getDate().toString() + (DateObject.getMonth() + 1).toString() + DateObject.getFullYear().toString();

            db.collection('todos').doc(user).collection(date).add({
                title,
                description,
                done : false,
                timeStamp : firebase.firestore.FieldValue.serverTimestamp()
              }).then( (docRef) => {
              navigation.navigate("Home");

              }).catch( (error) => {
                Alert.alert("Error adding task");
            })

     
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
