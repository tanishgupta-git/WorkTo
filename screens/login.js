import React,{useState,useEffect} from 'react'
import { TextInput, TouchableWithoutFeedback,View,Alert,Keyboard,StatusBar} from 'react-native'
import { Text,Button } from 'react-native-elements';
import { auth } from '../firebase/config';
import styles from '../styles/auth';

export default function Login({navigation}) {
    const [email,Setemail] = useState();
    const [password,Setpassword] = useState();

    const handleSubmit = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
          Alert.alert("email or password is incorrect");
        });

     }

    // adding a listener for user authentication state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            if (userAuth) {
                navigation.replace('Home');
            }
        })
       
        return unsubscribe;
    },[])


    const pressHandler = () => {
       navigation.navigate('Signup');
    }

    return (
      <TouchableWithoutFeedback onPress={()=> {Keyboard.dismiss()}}> 
        <View style={styles.container} >
        <StatusBar backgroundColor="#041955" />
            <Text h1 h1Style={styles.logoStyle}>WorkTo</Text>
            <View style={styles.formContainer}>
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
                  onSubmitEditing={handleSubmit}
              />   
              <Button containerStyle={styles.button}  buttonStyle={styles.styledButton} title='Login' onPress={handleSubmit}/>
              <Text style={styles.bottomText}>
                  Dont' Have An Account ? <TouchableWithoutFeedback onPress={pressHandler}><Text style={styles.linkText}>Sign up !</Text></TouchableWithoutFeedback>
              </Text>
         </View>
        </View>

        </TouchableWithoutFeedback>
    )
}

