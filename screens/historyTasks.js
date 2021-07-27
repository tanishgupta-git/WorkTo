import React,{ useState,useEffect } from 'react';
import { View, Text,StyleSheet,Alert,ScrollView,TouchableOpacity } from 'react-native';
import { MaterialIcons} from '@expo/vector-icons';
import { auth,db  } from '../firebase/config';
import Header from '../components/header';
import moment from 'moment';


const HistoryTasks = ({navigation}) => {

    const [tasksDate,setTasksDate] = useState([]);


    useEffect(() => {
        const user = auth?.currentUser?.email;

        db.collection('tasks').doc(user).collection("dates").get().then((snapshot) => {
           setTasksDate(snapshot.docs.map( doc => 
                                ({ id:doc.id,fomateDate:moment(doc.id,'DD-MMM-YYYY').format('DD MMM YYYY')})
                                
                                ))
        }).catch((err) => {
            Alert.alert("Error while loading history");
            console.log(err);
        })
    },[])

    return (
        <ScrollView style={styles.container}>
            <Header navigation={navigation} />
         
            <View style={styles.dateList}> 
                    {
                        tasksDate.map( taskDate => (
                            <View  key={taskDate.id} style={styles.dateItem} > 
                                <Text style={styles.dateText}>{taskDate.fomateDate}</Text>
                                <TouchableOpacity style={styles.detailHistory} onPress={ () =>  navigation.navigate('TasksDateHistory',{ taskDate:taskDate.id}) }>
                                    <MaterialIcons name="arrow-forward-ios" size={24} color="#A10CC9" />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
            </View>
        </ScrollView>
    )
}

export default HistoryTasks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#3450A1'
      },
    dateList :{
        marginVertical : 20,
        alignItems:'center'
    },
    dateItem : {
       backgroundColor:'#041955',
       padding :20,
       margin: 10,
       width: '90%',
       borderWidth:1,
       borderColor:'transparent',
       borderRadius:20
    },
    dateText : {
        marginLeft:10,
        fontSize:20,
        color:'#acbdec'
    },
    detailHistory : {
        position:'absolute',
        right: 10,
        top:20
    }
})