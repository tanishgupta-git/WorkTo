import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Progress from 'react-native-progress';
import countTaskType from '../utils/countTasktype';

const Dashboard = ({todos}) => {
    const [progress,setProgress] = useState(0);
    const [tasksCount,setTasksCount] = useState({Business:0,Personal:0,Other:0});

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

    return (
        <View style={styles.dashboard}>
           <View style={styles.progressParent}>
                    <View style={styles.progressContainer}>
                            <Progress.Circle 
                                size={120} borderWidth={0} showsText={true} color={'#85a4f9'} unfilledColor={'#06257a'}
                                borderColor={'#303030'} progress={progress / 100} animated thickness={10} formatText={() => { return `${progress}%`}}
                                />    
                                <Text style={styles.countHeadtext}>{todos.length} Task's</Text>        
                    </View>
            </View>
        
            <View style={styles.countContainer} >
                <View style={styles.countType}>
                    <Text style={styles.countTypehead}>Business</Text>
                    <Text style={styles.countTypetext}>{tasksCount.Business} tasks</Text>
                </View>
                <View style={styles.countType}>
                   <Text style={styles.countTypehead}>Personal</Text>
                   <Text style={styles.countTypetext}>{tasksCount.Personal} tasks</Text>
                </View>
                <View style={styles.countType}>
                   <Text style={styles.countTypehead}>Other</Text>
                   <Text style={styles.countTypetext}>{tasksCount.Other} tasks</Text>
                </View>

            </View>

    </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({

       progressParent : {
        alignItems:'center'
       },
       progressContainer : {
        backgroundColor:'#041955',
        width:'90%',
        padding: 29,
        marginVertical:10,
        borderRadius:10,
        alignItems:'center'
       },
       countHeadtext : {
        color: '#98ade7',
        textAlign:'center',
        fontSize:20,
        marginTop:15
       },
       countContainer : {
           flexDirection : 'row',
           flexWrap:'wrap',
           justifyContent:'space-around'
       },
       countType : {
           backgroundColor:'#041955',
           padding: 20,
           width: '40%',
           marginVertical : 10,
           borderRadius : 10
       },
       countTypehead : {
           fontWeight : 'bold',
           fontSize : 20,
           color : '#c8d6e7'
       },
       countTypetext : {
           color: '#94b4fb'
       }
})
