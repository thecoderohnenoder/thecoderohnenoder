import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

import { reauthenticate } from '../../utils/Api';

export default function ChangePasswordForm(props) {
	const { setIsVisibleModal, toastRef } = props;
	const [ password, setPassword ] = useState('');
	const [ newPassword, setNewPassword ] = useState('');
	const [ newPasswordRepeat, setNewPasswordRepeat ] = useState('');
	const [ error, setError ] = useState({});
	const [ isLoading, setIsLoading ] = useState(false);
	const [ hidePassword, setHidePassword ] = useState(true);
	const [ hideNewPassword, setHideNewPassword ] = useState(true);
	const [ hideNewPasswordRepeat, setHideNewPasswordRepeat ] = useState(true);

	const updatePassword = () => {
		setError({})
		if(!password || !newPassword || !newPasswordRepeat){
			let objError={}
			!password && (objError.password = "It cant be empty")
			!newPasswordRepeat && (objError.newPassword = "It cant be empty")
			!newPasswordRepeat && (objError.newPasswordRepeat="It cant be empty")
			setError(objError)
		}else{
			if(newPassword !== newPasswordRepeat){
				setError({
				newPassword:"Passwords have to be the same",
				newPasswordRepeat:"the new passwords have to be the same"
				})
			}else{
				setIsLoading(true)
				reauthenticate(password)
				.then(()=>{
					firebase.auth().currentUser.updatePassword(newPassword).then(()=>{
						setIsLoading(false)
						toastRef.current.show('Updating Password is right')
						setIsVisibleModal(false)
						firebase.auth().signOut()
					}).catch(()=>{
						setError({general: "error unknown"})
						toastRef.current.show('error unknown')
						setIsLoading(false)
						
					})
				})
				.catch(()=>{
					setError({password: "Password is False"})
					toastRef.current.show('Password is False')
					setIsLoading(false)
					
				})

			}
		}
	};

	return (
		<View style={Styles.view}>
			<Input
				placeholder="Current Password"
				containerStyle={Styles.input}
				secureTextEntry={hidePassword}
				onChange={(e) => setPassword(e.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: hidePassword ? 'eye-outline' : 'eye-off-outline',
					color: '#c2c2c2',
					onPress: () => setHidePassword(!hidePassword)
				}}
				errorMessage={error.newPassword}
			/>
			<Input
				placeholder="New Password"
				containerStyle={Styles.input}
				secureTextEntry={hideNewPassword}
				onChange={(e) => setNewPassword(e.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: hideNewPassword ? 'eye-outline' : 'eye-off-outline',
					color: '#c2c2c2',
					onPress: () => setHideNewPassword(!hideNewPassword)
				}}
				errorMessage={error.newPassword}
			/>
			<Input
				placeholder="New Password Repeat"
				containerStyle={Styles.input}
				secureTextEntry={hideNewPasswordRepeat}
				onChange={(e) => setNewPasswordRepeat(e.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: hideNewPasswordRepeat ? 'eye-outline' : 'eye-off-outline',
					color: '#c2c2c2',
					onPress: () => setHideNewPasswordRepeat(!hideNewPasswordRepeat)
				}}
				errorMessage={error.newPassword}
			/>
			<Button
				title="Change Password"
				containerStyle={Styles.btnContainer}
				buttonStyle={Styles.btn}
				onPress={updatePassword}
				loading={isLoading}
			/>
			<Text>{Error.general}</Text>
		</View>
	);
}

const Styles = StyleSheet.create({
	view: {
		alignItems: 'center',
		paddingBottom: 10,
		paddingTop: 10
	},

	input: {
		marginBottom: 10
	},
	btnContainer: {
		marginTop: 20,
		width: '70%'
	},
	btn: {
		backgroundColor: '#00a680'
	}
});
