import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
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