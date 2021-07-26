import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor:'#3450A1',
        paddingBottom:20
    },
    scrollContainer :{
        padding: 20
    },
    taskHeading : {
         color: '#ffffff'
    },
    description : {
        color: '#c5cfec',
        fontSize:20,
        marginVertical:20
    },
    taskType : {
        borderWidth : 1,
        borderColor : '#c5cfec',
        padding: 10,
        textAlign : 'center',
        width: 130,
        fontSize:19,
        borderRadius : 20,
        color: '#c5cfec',
        marginVertical : 20
    },
    taskDelete : {
        width: 150,
        padding: 10,
        backgroundColor:'#A10CC9',
        borderRadius:5
      },
      taskDeletetext : {
        color: '#c5cfec',
        fontSize:18,
        textAlign:'center',
        flexDirection: 'row',
        alignItems :'center'
      },
      taskdoneText : {
          color: '#c5cfec',
          marginLeft: 10,
          fontSize:18,
          marginVertical :10
      },
      taskdoneContainer : {
         flexDirection : 'row',
         alignItems : 'center'
      },
      buttonContainer : {
         marginVertical : 20,
         flexDirection : 'row',
         justifyContent : 'space-around' 
      },
      loadingContainer : {
        flex: 1,
        justifyContent:'center',
        alignItems : 'center'
      }              
})