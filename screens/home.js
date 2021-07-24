import React, {useEffect,useState } from 'react';
import { StyleSheet, View,Alert,StatusBar,TouchableOpacity,ScrollView } from 'react-native';
import  { Text } from 'react-native-elements';
import TodoItem from '../components/todoitem';
import { auth,db } from '../firebase/config';
import { AntDesign} from '@expo/vector-icons';
import Dashboard from '../components/dashboard';
import Header from '../components/header';
import moment from 'moment';

export default function Home({navigation}) {
    const [todos,setTodos] = useState([]);

    useEffect(() => {
        const user = auth?.currentUser?.email;
        const date = moment(new Date()).format('DD-MMM-YYYY')

       const unsubscribe = db.collection('todos').doc(user).collection(date).orderBy('timeStamp','desc').onSnapshot( snapshot => {
             setTodos(snapshot.docs.map(doc => ({key:doc.id,...doc.data()})));
             });

      return () => unsubscribe();
    },[])


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

                            <Header navigation={navigation}/>
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