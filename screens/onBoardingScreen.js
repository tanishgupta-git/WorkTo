import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16,color:'#98ade7'}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16,color:'#98ade7'}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16,color:'#98ade7'}}>Done</Text>
    </TouchableOpacity>
);

const OnBoardingScreen = ({navigation}) => {
    return (
     <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.replace("Login")}
        pages={[
          {
            backgroundColor: '#041955',
            image: <Image source={require('../assets/worktologo.png')} />,
            title: 'Track Your Tasks',
            subtitle:'Increase Your Productivity By Tracking',
          },
          {
            backgroundColor: '#041955',
            image: <Image style={styles.image} source={require('../assets/boarding3.png')} />,
            title: 'Categorize Your Day',
            subtitle: 'Add Your Task To Different Categories',
          }
        ]}
     />
    )
}

export default OnBoardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
      },
    image : {
        width: 400,
        resizeMode:'contain'
    },
    title : {
        color: '#ffffff',
        fontSize : 30,
        fontWeight:'bold',
        width: '70%'
    }
})
