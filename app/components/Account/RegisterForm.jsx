import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import Loading from '../Loading';
import * as firebase from 'firebase';
import { validateEmail } from '../../utils/Validation';
import { withNavigation } from 'react-navigation';

function RegisterForm(props) {
	const [ hidePassword, setHidePassword ] = useState(true);
	const [ hideRepeatPassword, setHideRepeatPassword ] = useState(true);
	const [ isVisibleLoading, setIsVisibleLoading ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ repeatPassword, setRepeatPassword ] = useState('');

	const register = async () => {
		const { toastRef, navigation } = props;
		console.log(props);
		setIsVisibleLoading(true);
		if (!email || !password || !repeatPassword) {
			console.log('all Inputs is require');
			toastRef.current.show('all Inputs is require');
		} else {
			if (!validateEmail(email)) {
				console.log('email is not valid');
				toastRef.current.show('email is not valid');
			} else {
				console.log('email is valid');
				if (password !== repeatPassword) {
					console.log('Passwords is not identic');
					toastRef.current.show('Passwords is not identic');
				} else {
					await firebase
						.auth()
						.createUserWithEmailAndPassword(email, password)
						.then(() => {
							navigation.navigate('MyAccount');
						})
						.catch(() => {
							console.log('Error Sign Up no create please insert your password new');
							toastRef.current.show('Error Sign Up no create please insert your password new');
						});
				}
			}
		}
		setIsVisibleLoading(false);
	};
	return (
		<View Style={Styles.formContainer} behavior="padding" enabled>
			<Input
				placeholder="Email"
				containerStyle={Styles.inputForm}
				onChange={(e) => setEmail(e.nativeEvent.text)}
				rightIcon={<Icon type="material-community" name="at" iconStyle={Styles.iconRight} />}
			/>

			<Input
				placeholder="Password"
				password={true}
				secureTextEntry={hidePassword}
				containerStyle={Styles.inputForm}
				onChange={(e) => setPassword(e.nativeEvent.text)}
				rightIcon={
					<Icon
						type="material-community"
						name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
						iconStyle={Styles.iconRight}
						onPress={() => setHidePassword(!hidePassword)}
					/>
				}
			/>
			<Input
				placeholder="Password confirm"
				password={true}
				secureTextEntry={hideRepeatPassword}
				containerStyle={Styles.inputForm}
				onChange={(e) => setRepeatPassword(e.nativeEvent.text)}
				rightIcon={
					<Icon
						type="material-community"
						name={hideRepeatPassword ? 'eye-outline' : 'eye-off-outline'}
						iconStyle={Styles.iconRight}
						onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
					/>
				}
			/>
			<Button
				title="SignUp"
				containerStyle={Styles.btnContainerRegister}
				buttonStyle={Styles.btnRegister}
				onPress={register}
			/>
			<Loading text="SIGN UP process" isVisible={isVisibleLoading} />
		</View>
	);
}

export default withNavigation(RegisterForm);

const Styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30
	},
	inputForm: {
		width: '100%',
		marginTop: 20
	},
	iconRight: {
		color: '#5d5666'
	},
	btnContainerRegister: {
		marginTop: 25,
		width: '90%',
		marginLeft: '5%'
	},
	btnRegister: {
		backgroundColor: '#00a680'
	}
});
