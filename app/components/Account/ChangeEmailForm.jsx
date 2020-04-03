import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { reauthenticate } from '../../utils/Api.js';

export default function ChangeEmailForm(props) {
	const { email,  setReloadData, toastRef } = props;
	const [ newEmail, setNewEmail ] = useState('');
	const [ hidePassword, setHidePassword ] = useState(true);
	const [ error, setError ] = useState({});
	const [ isLoading, setIsLoading ] = useState(false);
	const [ password, setPassword ] = useState('');
	const updateEmail = () => {
		setError({});
		if (!newEmail || email === newEmail) {
			setError({ email: 'Email ist identic as old' });
		} else {
			setIsLoading(true);
			reauthenticate(password)
				.then(() => {
					firebase
						.auth()
						.currentUser.updateEmail(newEmail)
						.then(() => {
							setIsLoading(false);
							setReloadData(true);
							toastRef.current.show('Updating email is right');
						})
						.catch(() => {
							setError({ email: 'error is ocurred als updating email' });
						});
				})
				.catch(() => {
					setError({ password: 'password is false' });
					setIsLoading(false);
				});
		}
	};

	return (
		<View style={Styles.view}>
			<Input
				placeholder="Email"
				containerStyle={Styles.input}
				defaultValue={email && email}
				onChange={(e) => setNewEmail(e.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: 'at',
					color: '#c2c2c2'
				}}
				errorMessage={error.email}
			/>
			<Input
				placeholder="Password"
				containerStyle="Styles.input"
				password={true}
				secureTextEntry={hidePassword}
				onChange={(e) => setPassword(e.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: hidePassword ? 'eye-outline' : 'eye-off-outline',
					color: '#c2c2c2',
					onPress: () => setHidePassword(!hidePassword)
				}}
				errorMessage={error.password}
			/>
			<Button
				title="Change Email"
				containerStyle={Styles.btnContainer}
				buttonStyle={Styles.btn}
				onPress={updateEmail}
				loading={isLoading}
			/>
		</View>
	);
}

const Styles = StyleSheet.create({
	view: {
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10
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
