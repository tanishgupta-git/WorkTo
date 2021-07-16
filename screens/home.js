import React, {useEffect,useState } from 'react';
import { StyleSheet, View,FlatList,Alert,TouchableWithoutFeedback,Keyboard,StatusBar,TouchableOpacity } from 'react-native';
import  { Text } from 'react-native-elements';
import TodoItem from '../components/todoitem';
import { auth,db } from '../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import countTaskType from '../utils/countTasktype';
import * as Progress from 'react-native-progress';


export default function Home({navigation}) {
    const [todos,setTodos] = useState([]);
    const [progress,setProgress] = useState(0);
    const [tasksCount,setTasksCount] = useState({Business:0,Personal:0,Other:0});

    useEffect(() => {
        const user = auth?.currentUser?.email;
        const DateObject = new Date();
        const date = DateObject.getDate().toString() + (DateObject.getMonth() + 1).toString() + DateObject.getFullYear().toString();

       const unsubscribe = db.collection('todos').doc(user).collection(date).orderBy('timeStamp','desc').onSnapshot( snapshot => {
             setTodos(snapshot.docs.map(doc => ({key:doc.id,...doc.data()})));
             });

      return () => unsubscribe();
    },[])

    useEffect(() => {

        const doneDocs =  todos.reduce( (x,y) => {
          if (y.done) {
            return x + 1
          }else {
            return x
          }
        },0);
        if(!todos.length) {
          setProgress(0);
          return;
        }
       setProgress( (doneDocs/todos.length) * 100 );
       const businessTasks = countTaskType(todos,'Business');
       const personalTasks = countTaskType(todos,'Personal');
       const otherTasks = countTaskType(todos,'Other');

       setTasksCount({Business:businessTasks,Personal:personalTasks,Other:otherTasks});
    
      },[todos])
   
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
          <View style={styles.progressParent}>
                <View style={styles.progressContainer}>
                  <Progress.Circle 
                      size={110} borderWidth={0} showsText={true} 
                      color={'#85a4f9'}
                      unfilledColor={'#06257a'}
                      borderColor={'#303030'}
                      progress={progress / 100}
                      animated
                      thickness={10}
                      formatText={() => {
                        return `${progress}%`
                      }}
                  
                      />
          
                </View>
                <View>
                   <Text>Business : {tasksCount.Business}</Text>
                   <Text>Personal : {tasksCount.Personal}</Text>
                   <Text>Other : {tasksCount.Other}</Text>
                </View>
          </View>
            <View style={styles.list}>
               <Text style={styles.listHeading}>Today's Task</Text>
               <FlatList 
               data={todos}
               renderItem={({item}) => (
                 <TodoItem item={item} pressHandler={pressHandler} setTodos={setTodos} />
               )}
               />
            </View>
            <TouchableOpacity style={styles.addTaskbutton} onPress={() => navigation.navigate('AddTodo')}>
                      <Text><AntDesign name="plus" size={24} color="#ffffff" /></Text>
            </TouchableOpacity>
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
   progressParent : {
     alignItems:'center'
   },
   progressContainer : {
     backgroundColor:'#041955',
     width:'90%',
     padding: 29,
     marginVertical:10,
     alignItems:'center',
     borderRadius:10
   },
   addTaskbutton : {
     position:'absolute',
     bottom: 20,
     right: 20,
     backgroundColor:'#EB06FF',
     padding: 20,
     flexDirection:'row',
     alignItems:'center',
     color: '#b2bfe6',
     fontSize:18,
     borderRadius:70

   }
  });