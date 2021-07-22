import React from 'react'
import { StyleSheet, View,TouchableOpacity } from 'react-native'
import { auth} from '../firebase/config';
import { AntDesign,FontAwesome5 } from '@expo/vector-icons';

const Header = ({navigation}) => {

    // fuction for signout 
    const signOutHandler = () => {
        auth.signOut().then(() => {
          navigation.replace('Login');
        }
        ).catch(err => {
          Alert.alert('Error occured in sign out');
        })
      }

    return (
        <View style={styles.navbar}>

            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <FontAwesome5 name="grip-lines" size={30} color="#b2bfe6" />
            </TouchableOpacity>
            <TouchableOpacity onPress={signOutHandler}>
                <AntDesign name="poweroff" size={24} color="#b2bfe6" />
            </TouchableOpacity>

       </View>
    )

}

export default Header;

const styles = StyleSheet.create({
    navbar : {
        flexDirection:'row',
        justifyContent:'space-between',
        padding:20,
        paddingBottom:10
      }
})
