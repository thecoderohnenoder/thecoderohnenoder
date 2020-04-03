import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
export default function InfoUser(props) {
	const { userInfo: { uid, displayName, photoURL, email },
setReloadData,
toastRef,
setIsLoading,
setTextLoading
 } = props;

	const changeAvatar = async () => {
		const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
		if (resultPermissionCamera === 'denied') {
			toastRef.current.show('Process Gallery Suspense');
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [ 4, 3 ] });
			if (result.cancelled) {
				toastRef.current.show('Gallery closed');
			} else {
				uploadImage(result.uri, uid).then(() => {
					toastRef.current.show('Image Uploaded right');
					updatePhotoUrl(uid);
				});
			}
		}
	};

	const uploadImage = async (uri, nameImage) => {
		setTextLoading("Avatar Updating")
		setIsLoading(true)
		const response = await fetch(uri);
		const blob = await response.blob();

		console.log(JSON.stringify(response));

		const ref = firebase.storage().ref().child(`avatar/${nameImage}`);

		return ref.put(blob);
	};

	const updatePhotoUrl = uid => {
        firebase
          .storage()
          .ref(`avatar/${uid}`)
          .getDownloadURL()
          .then(async result => {
            const update = {
              photoURL: result
            };
            await firebase.auth().currentUser.updateProfile(update);
			setReloadData(true)
			setIsLoading(false)
          })
          .catch(() => {
            toastRef.current.show("Error al recuperar el avatar del servidor");
          });
      };
	return (
		<View style={Styles.viewUserInfo}>
			<Avatar
				rounded
				size="large"
				source={{
					uri: photoURL ? photoURL : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
				}}
				showEditButton
				onEditPress={changeAvatar}
				containerStyle={Styles.userInfoAvatar}
			/>
			<View>
				<Text Styles={Styles.displayName}>{displayName ? displayName : 'Anonimo'}</Text>
				<Text>{email}</Text>
			</View>
		</View>
	);
}

const Styles = StyleSheet.create({
	viewUserInfo: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#f2f2f2',
		paddingTop: 30,
		paddingBottom: 30
	},
	userInfoAvatar: {
		marginRight: 20
	},
	displayName: {
		fontWeight: 'bold'
	}
});
