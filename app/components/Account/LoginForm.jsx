import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { validateEmail } from '../../utils/Validation';
import { withNavigation } from 'react-navigation';
import Loading from '../Loading';

function LoginForm(props) {
	const [ hidePassword, setHidePassword ] = useState(true);
	const [ isVisibleLoading, setIsVisibleLoading ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
     
	const login = async () => {
        const { toastRef, navigation } = props;
        setIsVisibleLoading(true);
		console.log(props);
		if (!email || !password) {
			console.log('all Inputs is require');
			toastRef.current.show('all Inputs is require');
		} else {
			if (!validateEmail(email)) {
				console.log('email is not valid');
				toastRef.current.show('email is not valid');
			} else {
				await firebase
					.auth()
					.signInWithEmailAndPassword(email, password)
					.then(() => {
						navigation.navigate('MyAccount');
					})
					.catch(() => {
						console.log('Error Sign Up no create please insert your password new');
						toastRef.current.show('Error Sign Up no create please insert your password new');
					});
			}
        }
        setIsVisibleLoading(false);
	};

	return (
		<View Styles={StyleSheet.formContainer}>
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

			<Button
				title="Sign In"
				containerStyle={Styles.btnContainerLogin}
				buttonStyle={Styles.btnLogin}
				onPress={login}
			/>
			<Loading isVisible={isVisibleLoading} text="Session creating" />
		</View>
	);
}

export default withNavigation(LoginForm);

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
	btnContainerLogin: {
		marginTop: 25,
		width: '90%',
		marginLeft: '5%'
	},
	btnLogin: {
		backgroundColor: '#00a680'
	}
});
