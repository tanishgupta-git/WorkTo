import React,{useState,useEffect} from 'react';
import { View, TextInput,TouchableOpacity, Alert,Keyboard,TouchableWithoutFeedback } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-elements';
import { auth,db } from '../firebase/config';
import styles from '../styles/form';

export default function EditTodo({navigation,route}) {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [openPicker, setOpenPicker] = useState(false);
    const [valuePicker, setValuePicker] = useState(null);
    const [items, setItems] = useState([
      {label: 'Business', value: 'Business'},
      {label: 'Personal', value: 'Personal'},
      {label: 'Other', value: 'Other'},
    ]);

    const { todoId,updateCheck } = route.params; 
    
    useEffect(() => {
     
        const user = auth?.currentUser?.email;
        const DateObject = new Date();
        const date = DateObject.getDate().toString() + (DateObject.getMonth() + 1).toString() + DateObject.getFullYear().toString();

        db.collection('todos').doc(user).collection(date).doc(todoId).get().then( doc => {
           setTitle(doc.data().title);
           setDescription(doc.data().description);
           setValuePicker(doc.data().tasktype);
        }).catch( err => {
            Alert.alert(err);
        })

    },[todoId])

    const submitHandler = () => {

      if (!title.length || !description.length || !valuePicker) {
        Alert.alert("All the fields are required");
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

          db.collection('todos').doc(user).collection(date).doc(todoId).update({
              title,
              description,
              tasktype:valuePicker
            }).then( (docRef) => {
            navigation.navigate("Todo",{
                todoId,
                updateCheck : !updateCheck
            });
            }).catch( (error) => {
              Alert.alert("Error updating task");
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

          <DropDownPicker
            open={openPicker}
            value={valuePicker}
            items={items}
            setOpen={setOpenPicker}
            setValue={setValuePicker}
            setItems={setItems}
            placeholder="Select Task Type"
            style={{ backgroundColor:'#253974',borderColor:'transparent'}}
            placeholderStyle={{color: "#8b9fda",fontSize:18}}
            arrowIconStyle={{width: 20,height: 20,tintColor: '#8b9fda'}}
            tickIconStyle={{width: 20,height: 20,tintColor: '#8b9fda'}}
            labelStyle={{color: '#c5cfed',fontSize:19}}
            listItemContainerStyle={{backgroundColor:'#3450A1'}}
            listItemLabelStyle={{color:'#c5cfed',fontSize:17}}
            selectedItemContainerStyle={{backgroundColor: "#253974"}}
            dropDownDirection="BOTTOM"
          /> 

          <View style={styles.addTaskButtonContainer}>            
                <TouchableOpacity><Button onPress={submitHandler}  title='Update Task' buttonStyle={styles.addButton}/></TouchableOpacity> 
          </View>
          </View>
      </TouchableWithoutFeedback>
     )  
}