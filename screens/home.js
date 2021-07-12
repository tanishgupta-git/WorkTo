import React, {useEffect,useState } from 'react';
import { StyleSheet, View,FlatList,Alert,TouchableWithoutFeedback,Keyboard,StatusBar,TouchableOpacity } from 'react-native';
import  { Text } from 'react-native-elements';
import TodoItem from '../components/todoitem';
import { auth,db } from '../firebase/config';
import { AntDesign,Entypo } from '@expo/vector-icons';



export default function Home({navigation}) {
    const [todos,setTodos] = useState();
    
    useEffect(() => {
        const user = auth?.currentUser?.email;
        const DateObject = new Date();
        const date = DateObject.getDate().toString() + (DateObject.getMonth() + 1).toString() + DateObject.getFullYear().toString();

       const unsubscribe = db.collection('todos').doc(user).collection(date).orderBy('timeStamp','desc').onSnapshot( snapshot => {
             setTodos(snapshot.docs.map(doc => ({key:doc.id,...doc.data()})));
        });

      return () => unsubscribe();
    },[])

   
    const signOutHandler = () => {
      auth.signOut().then(() => {
        navigation.replace('Login');
      }
      ).catch(err => {
        Alert.alert('Error occured in sign out');
      })
    }

    const pressHandler = (key) => {
      navigation.navigate('Todo',{
        todoId:key
      })
    }

    return (
        <TouchableWithoutFeedback onPress={()=> {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
        <StatusBar backgroundColor="#3450A1" />
          <View style={styles.content}>
          <View style={styles.logoutbar}>
           <TouchableOpacity onPress={signOutHandler}>
             <AntDesign name="poweroff" size={24} color="#b2bfe6" />
            </TouchableOpacity>
          </View>
            <Text h2 h2Style={styles.welcomeHeading}>What's up, {auth?.currentUser?.displayName}!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddTodo')}>
                   <Text style={styles.addTaskbutton}><Entypo name="circle-with-plus" size={24} color="#A10CC9" /> Add new task here</Text>
            </TouchableOpacity>
            <View style={styles.list}>
               <Text style={styles.listHeading}>Today's Task</Text>
               <FlatList 
               data={todos}
               renderItem={({item}) => (
                 <TodoItem item={item} pressHandler={pressHandler} />
               )}
               />
            </View>
          </View>
        </View>
        </TouchableWithoutFeedback>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#3450A1'
    },
    logoutbar : {
      flexDirection:'row',
      justifyContent:'flex-end'
    },
    welcomeHeading : {
      fontSize:30,
      marginVertical:15,
      color: '#EFF1F7'
    },
    content: {
      flex: 1,
      padding: 20
    },
   list : {
     flex: 1,
     marginTop:20,
   },
   listHeading : {
     color: '#98ade7',
     marginVertical:5,
     fontSize:20
   },
   addTaskbutton : {
     backgroundColor:'#041955',
     padding: 20,
     flexDirection:'row',
     alignItems:'center',
     color: '#b2bfe6',
     fontSize:20,
     borderRadius:4
   }
  });