import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container : {
       backgroundColor : '#3450A1',
       padding: 15,
       flex: 1,
       justifyContent:'center'
    }, 
     input : {
         marginBottom :10,
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
       backgroundColor:'#A10CC9',
       marginTop:10
     } ,
     textArea: {
       height:150,
       textAlignVertical:'top',
       marginVertical:20,
       padding: 15,
       fontSize:19,
       color:'#c5cfed',
       backgroundColor:'#253974',
       borderRadius : 4
     },
     formSubmitloader : {
      position:'absolute',
      top:0,
      left: 0,
      right: 0,
      bottom: 0,
      flex: 1,
      justifyContent:'center',
      alignItems : 'center',
      backgroundColor : '#041955',
      opacity: 0.7
     }
 })