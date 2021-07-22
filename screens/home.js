import React, {useEffect,useState } from 'react';
import { StyleSheet, View,Alert,StatusBar,TouchableOpacity,ScrollView } from 'react-native';
import  { Text } from 'react-native-elements';
import TodoItem from '../components/todoitem';
import { auth,db } from '../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import Dashboard from '../components/dashboard';


export default function Home({navigation}) {
    const [todos,setTodos] = useState([]);

    useEffect(() => {
        const user = auth?.currentUser?.email;
        const DateObject = new Date();
        const date = DateObject.getDate().toString() + (DateObject.getMonth() + 1).toString() + DateObject.getFullYear().toString();

       const unsubscribe = db.collection('todos').doc(user).collection(date).orderBy('timeStamp','desc').onSnapshot( snapshot => {
             setTodos(snapshot.docs.map(doc => ({key:doc.id,...doc.data()})));
             });

      return () => unsubscribe();
    },[])

// fuction for signout 
    const signOutHandler = () => {
      auth.signOut().then(() => {
        navigation.replace('Login');
      }
      ).catch(err => {
        Alert.alert('Error occured in sign out');
      })
    }

// function for opening the single todo screen
    const pressHandler = (key) => {
      navigation.navigate('Todo',{
        todoId:key
      })
    }

    return (  
            <View style={styles.container}>
                <StatusBar backgroundColor="#3450A1" />
                <ScrollView>

                            <View style={styles.logoutbar}>
                            <TouchableOpacity onPress={signOutHandler}>
                              <AntDesign name="poweroff" size={24} color="#b2bfe6" />
                              </TouchableOpacity>
                            </View>
                            <Text h2 h2Style={styles.welcomeHeading}>What's up, {auth?.currentUser?.displayName}!</Text>
                            <Dashboard  todos={todos} />
                            <View style={styles.list}>
                              <Text style={styles.listHeading}>Today's Task</Text>
                              { 
                          
                                  todos.map( item => (
                                  <TodoItem key={item.key} item={item} pressHandler={pressHandler} setTodos={setTodos} />
                                )) 
                             
                              }

                            </View>

                      </ScrollView>
                      <TouchableOpacity style={styles.addTaskbutton} onPress={() => navigation.navigate('AddTodo')}>
                                    <Text><AntDesign name="plus" size={24} color="#ffffff" /></Text>
                      </TouchableOpacity>
            </View>
      );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#3450A1'
    },
    logoutbar : {
      flexDirection:'row',
      justifyContent:'flex-end',
      padding:20,
      paddingBottom:0
    },
    welcomeHeading : {
      fontSize:30,
      marginVertical:20,
      marginHorizontal :20,
      color: '#EFF1F7'
    },
    content: {
      flex: 1
    },
   list : {
     flex: 1,
     marginTop:5, 
     padding: 20,
     marginBottom:100
   },
   listHeading : {
     color: '#98ade7',
     marginVertical:5,
     fontSize:20
   },
   addTaskbutton : {
     position: 'absolute',
     bottom: 30,
     right: 20,
     backgroundColor:'#EB06FF',
     padding: 20,
     flexDirection:'row',
     alignItems:'center',
     color: '#b2bfe6',
     fontSize:18,
     borderRadius:70
   },

  });