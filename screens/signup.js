import React,{useState} from 'react'
import { Alert } from 'react-native';
import { View,TextInput,TouchableWithoutFeedback,Keyboard,Image,ActivityIndicator } from 'react-native'
import { Text,Button } from 'react-native-elements';
import { auth } from '../firebase/config';
import styles from '../styles/auth';

const Signup = ({navigation}) => {
    const [username,Setusername] = useState();
    const [email,Setemail] = useState();
    const [password,Setpassword] = useState();
    const [loading,setLoading] = useState(false);
    
    const handleSubmit = () => {

      if(!username && !email && !password) {
          Alert.alert("All fields are required");
          return;
      }
      setLoading(true);
      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
         userCredential.user.updateProfile({ displayName: username })
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Error in signup");

      });
    }

    const pressHandler = () => {
      navigation.navigate('Login');
   }

    return (
      <TouchableWithoutFeedback onPress={()=> {
        Keyboard.dismiss();
      }}>
        <View style={styles.container}>
        {
                loading ?
                <View style={styles.loaderContainer}> 
                <View style={styles.logoContainer} >
                    <Image style={styles.logo} source={require('../assets/worktologo.png')} />
                </View>
                    <ActivityIndicator size="large" color='#A10CC9' />
                </View>
                 :

                  <View style={styles.formContainer}>
                  <View style={styles.logoContainer} >
                    <Image style={styles.logo} source={require('../assets/worktologo.png')} />
                 </View>
                  <TextInput style={styles.input}
                      placeholder='username'
                      placeholderTextColor='#9eb6fa'
                      onChangeText={(value) => Setusername(value)}
                      value={username}
                  
                  />

                  <TextInput style={styles.input}
                      placeholder='email'
                      placeholderTextColor='#9eb6fa'
                      onChangeText={(value) => Setemail(value)}
                      value={email} 
                  />

                  <TextInput style={styles.input}
                      placeholder='password'
                      placeholderTextColor='#9eb6fa'
                      onChangeText={(value) => Setpassword(value)}
                      value={password} 
                      secureTextEntry
                  />   
                  <Button containerStyle={styles.button} buttonStyle={styles.styledButton} title='Signup' onPress={handleSubmit}/>
                  <View style={styles.bottomContainer}>
                      <Text style={styles.bottomText}>Already Have An Account ? </Text>
                      <TouchableWithoutFeedback onPress={pressHandler}><Text style={styles.linkText}>Log in !</Text></TouchableWithoutFeedback>
                 </View>
          </View>
        }

        </View>

      </TouchableWithoutFeedback>
    )
}

export default Signup;