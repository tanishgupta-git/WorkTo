import React,{useState} from 'react';
import { View, TextInput,TouchableOpacity, Alert,Keyboard,TouchableWithoutFeedback,ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-elements';
import { auth,db } from '../firebase/config';
import firebase from 'firebase';
import styles from '../styles/form';
import moment from 'moment';

export default function AddTask({navigation}){

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [openPicker, setOpenPicker] = useState(false);
    const [valuePicker, setValuePicker] = useState(null);
    const [items, setItems] = useState([
      {label: 'Business', value: 'Business'},
      {label: 'Personal', value: 'Personal'},
      {label: 'Other', value: 'Other'}]);
    const [addLoader,setAddLoader] = useState(false);


    const submitHandler = async () => {
          setAddLoader(true);

          if (!title.length || !description.length || !valuePicker) {

            setAddLoader(false);
            Alert.alert("All the fields are required");
            return;

          }

          if (title.length < 3) {

            setAddLoader(false);
            Alert.alert("Title must be greater than 5 characters");
            return;

          }

          if (description.length < 10) {

            setAddLoader(false);
            Alert.alert("Description must be greater than 10 characters");
            return;

          }

          const user = auth?.currentUser?.email;
          const date = moment(new Date()).format('DD-MMM-YYYY')
            
         try {
          const docRef  = await db.collection('tasks').doc(user).collection("dates").doc(date);
          const doc =     await docRef.get();
          if (! doc.exists) {
             await docRef.set({added : true })
          }

          await db.collection('tasks').doc(user).collection(date).add({title,description,done : false,tasktype:valuePicker,timeStamp : firebase.firestore.FieldValue.serverTimestamp()})
          navigation.navigate("Home");

        } catch (err) {
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
                    <TouchableOpacity><Button onPress={submitHandler}  title='Add Task' buttonStyle={styles.addButton}/></TouchableOpacity> 
              </View>
              {
            addLoader && 
            <View style={styles.formSubmitloader}> 
                    <ActivityIndicator size="large" color='#A10CC9' />
                </View>

             }
          </View>
    </TouchableWithoutFeedback>
   )    
}
