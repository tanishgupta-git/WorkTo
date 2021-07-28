import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    container : {
      flex : 1,
      backgroundColor:'#041955'
    },
    logoContainer :{
      alignItems:'center',
      marginBottom : 25
    },
    logo : {
      width: 150,
      height: 150,
      resizeMode :'contain'
    },
    formContainer : {
      flex: 1,
      justifyContent: 'center',
      alignItems : 'center'
    },
    input : {
        padding: 15,
        borderStyle:'solid',
        marginVertical:15,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius:5,
        backgroundColor:'#031649',
        fontSize:18,
        color: '#ffffff',
        width: 300
    },
    button : {
       width: 200,
       marginVertical:20,
    },
    styledButton : {
      backgroundColor : '#EB06FF'
    },
    bottomText : {
     color: '#ffffff'
    },
    linkText : {
     color: '#EB06FF'
    }
  })