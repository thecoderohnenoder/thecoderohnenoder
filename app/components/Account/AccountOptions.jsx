import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountOptions(props) {
	const { userInfo, setReloadData, toastRef } = props;
	const [ isVisibleModal, setIsVisibleModal ] = useState(false);
	const [ renderComponent, setRenderComponent ] = useState(null);

	const menuOptions = [
		{
			title: 'Change your name and surname',
			iconType: 'material-community',
			iconNameLeft: 'account-circle',
			iconColorLeft: '#ccc',
			iconNameRight: 'chevron-right',
			iconColorRight: '#ccc',
			onPress: () => selectedComponent('displayName')
		},
		{
			title: 'Change your Email',
			iconType: 'material-community',
			iconNameLeft: 'at',
			iconColorLeft: '#ccc',
			iconNameRight: 'chevron-right',
			iconColorRight: '#ccc',
			onPress: () => selectedComponent('email')
		},
		{
			title: 'Change your Password',
			iconType: 'material-community',
			iconNameLeft: 'lock-reset',
			iconColorLeft: '#ccc',
			iconNameRight: 'chevron-right',
			iconColorRight: '#ccc',
			onPress: () => selectedComponent('password')
		}
	];
	const selectedComponent = (key) => {
		switch (key) {
			case 'displayName':
				setRenderComponent(
					<ChangeDisplayNameForm
						displayName={userInfo.displayName}
						setIsVisibleModal={setIsVisibleModal}
						setReloadData={setReloadData}
						toastRef={toastRef}
					/>
				);
				setIsVisibleModal(true);
				break;
			case 'email':
				setRenderComponent(
					<ChangeEmailForm
						displayName={userInfo.email}
						setIsVisibleModal={setIsVisibleModal}
						setReloadData={setReloadData}
						toastRef={toastRef}
					/>
				);
				setIsVisibleModal(true);
				break;
			case 'password':
				setRenderComponent(
					<ChangePasswordForm setIsVisibleModal={setIsVisibleModal} toastRef={toastRef}
						displayName={userInfo.password}
						setIsVisibleModal={setIsVisibleModal}
						setReloadData={setReloadData}
						toastRef={toastRef}
					/>
				);
				setIsVisibleModal(true);
				break;
		}
	};

	return (
		<View>
			{menuOptions.map((menu, index) => (
				<ListItem
					key={index}
					title={menu.title}
					leftIcon={{
						type: menu.iconType,
						name: menu.iconNameLeft,
						color: menu.iconColorLeft
					}}
					rightIcon={{
						type: menu.iconType,
						name: menu.iconNameRight,
						color: menu.iconColorRight
					}}
					onPress={menu.onPress}
					containerStyle={Styles.MenuItem}
				/>
			))}
			{renderComponent && (
				<Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
					{renderComponent}
				</Modal>
			)}
		</View>
	);
}

const Styles = StyleSheet.create({
	MenuItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#e3e3e3'
	}
});
