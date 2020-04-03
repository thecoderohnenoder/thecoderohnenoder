import React, {useRef} from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RegisterForm from '../../components/Account/RegisterForm';
import  Toast from 'react-native-easy-toast'


export default function Register() {
    const toastRef=useRef()
	return (
		<KeyboardAwareScrollView>
			<Image source={require('../../../assets/img/logoLogin.png')} style = {Styles.logo } resizeMode="contain"
           
            />
            <View style={Styles.viewForm}>
            <RegisterForm toastRef={toastRef} />
            </View>
         <Toast ref={toastRef} position="center" opacity={0.5} />
            
		</KeyboardAwareScrollView>
	);
}

const Styles = StyleSheet.create({
    logo:{
        width: "100%",
        height:150,
        marginTop:20
    },
    viewForm:{
        marginRight:40,
        marginLeft:40,

    }
})