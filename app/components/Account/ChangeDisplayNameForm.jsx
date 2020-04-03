import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { Input, Button } from 'react-native-elements';

export default function ChangeDisplayNameForm(props) {
	const { displayName, setIsVisibleModal, setReloadData, toastRef } = props;
	const updateDisplayName = () => {
		setError(null);
		if (!newDisplayName) {
			setError('Name of User is not updated');
		} else {
			setIsLoading(true);
			const update = {
				displayName: newDisplayName
			};
			firebase
				.auth()
				.currentUser.updateProfile(update)
				.then(() => {
					setIsLoading(false);
					setReloadData(true);
					toastRef.current.show('Name ist Updated');
					setIsVisibleModal(false);
				})
				.catch(() => {
					setError('Error to Name updating');
					setIsLoading(false);
				});
		}
	};
	const [ newDisplayName, setNewDisplayName ] = useState(null);
	const [ error, setError ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);
	return (
		<View style={Styles.view}>
			<Input
				placeholder="Name"
				containerStyle={Styles.input}
				defaultValue={displayName && displayName}
				onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: 'account-circle-outline',
					color: '#c2c2c2'
				}}
				errorMessage={error}
			/>
			<Button
				title="Change Name"
				containerStyle={Styles.btnContainer}
				buttonStyle={Styles.btn}
				onPress={updateDisplayName}
				loading={isLoading}
			/>
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
        width:"70%"
	},
	btn: {
		backgroundColor: '#00a680'
	}
});
