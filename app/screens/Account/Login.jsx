import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import LoginForm from '../../components/Account/LoginForm';
import Toast from 'react-native-easy-toast';
import LoginFacebook from '../../components/Account/LoginFacebook';

export default function Login(props) {
	const { navigation } = props;
	const toastRef = useRef();
	return (
		<ScrollView>
			<Image source={require('../../../assets/img/logoLogin.png')} style={Styles.logo} resizeMode="contain" />
			<View style={Styles.viewContainer}>
				<LoginForm toastRef={toastRef} />
				<CreateAccount navigation={navigation} />
			</View>
			<Divider style={Styles.divider} />
			<View style={Styles.viewContainer}>
				<LoginFacebook toastRef={toastRef} navigation={navigation}/>
			</View>
			<Toast ref={toastRef} position="center" opacity={0.5} />
		</ScrollView>
	);
}

function CreateAccount(props) {
	const { navigation } = props;

	return (
		<Text style={Styles.textRegister}>
			Please Register your Account
			<Text style={Styles.btnRegister} onPress={() => navigation.navigate('Register')}>
				{'\r'}Sign Up
			</Text>
		</Text>
	);
}

const Styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 150,
		marginTop: 20
	},
	viewContainer: {
		marginRight: 40,
		marginLeft: 40
	},
	textRegister: {
		marginTop: 15,
		marginLeft: 10,
		marginRight: 10
	},
	btnRegister: {
		color: '#00a680',
		fontWeight: 'bold',
		marginLeft: 5,
		marginRight: 5
	},
	divider: {
		backgroundColor: '#00a680',
		margin: 40
	}
});
