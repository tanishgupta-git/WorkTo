import React,{useState,useEffect} from 'react';
import { StyleSheet,View, TextInput,TouchableOpacity, Alert,Keyboard,TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import { auth,db } from '../firebase/config';

export default function EditTodo({navigation,route}) {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const { todoId,updateCheck } = route.params; 
    useEffect(() => {
     
        const user = auth?.currentUser?.email;
        const DateObject = new Date();
        const date = DateObject.getDate().toString() + (DateObject.getMonth() + 1).toString() + DateObject.getFullYear().toString();

        db.collection('todos').doc(user).collection(date).doc(todoId).get().then( doc => {
           setTitle(doc.data().title);
           setDescription(doc.data().description);
        }).catch( err => {
            Alert.alert(err);
        })

    },[todoId])

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
        if (user && date) {

          db.collection('todos').doc(user).collection(date).doc(todoId).update({
              title,
              description
            }).then( (docRef) => {
            navigation.navigate("Todo",{
                todoId,
                updateCheck : !updateCheck
            });
            }).catch( (error) => {
              Alert.alert("Error updating task");
          })

    }else {
      Alert.alert("Error updating task");
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
                
                <TouchableOpacity><Button onPress={submitHandler}  title='Update Task' buttonStyle={styles.addButton}/></TouchableOpacity> 
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
