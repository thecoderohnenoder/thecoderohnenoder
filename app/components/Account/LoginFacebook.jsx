import React, { useState } from 'react';
import { SocialIcon } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { FacebookApi } from '../../utils/Social';
import Loading from '../Loading';


export default function LoginFacebook(props) {
	const { toastRef, navigation } = props;
	const [ isLoading, setIsLoading ] = useState(false);

	Facebook.initializeAsync('563826720894883');
	const login = async () => {
		
		const { type, token } = await Facebook.logInWithReadPermissionsAsync(FacebookApi.application_id, {
			permissions: FacebookApi.permissions
		});
		if (type === 'success') {
            setIsLoading(true);
			const credentials = firebase.auth.FacebookAuthProvider.credential(token);
			await firebase.auth().signInWithCredential(credentials).then(() => {
				navigation.navigate("MyAccount")}).catch(() => {
					toastRef.current.show('ERROR when trying to access Facebook, please try again later');
                
                
			});
		} else if (type === 'cancel') {
			toastRef.current.show('Login Canceled');
		} else {
			toastRef.current.show(' UNKNOWN ERROR, please try again later ');
		}
		setIsLoading(false);
	};

	return (
		<>
			<SocialIcon title="Login with Facebook" button type="facebook" onPress={login} />
			<Loading isVisible={isLoading} text="Logged" />
		</>
	);
}
