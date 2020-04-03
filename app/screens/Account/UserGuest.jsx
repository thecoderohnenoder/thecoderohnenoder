import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import {withNavigation} from 'react-navigation'

 function UserGuest(props) {
	 const{navigation}=props;
	return (
		<ScrollView style={styles.viewBody} centerContent={true}>
			<Image source={require('../../../assets/img/original.jpg')} style={styles.image} resizeMode="contain" />
			<Text style={styles.title}>Consult your Account</Text>
			<Text style={styles.description}>Description</Text>
			<View style={styles.viewBtn}>
			<Button
				buttonStyle={styles.btnStyle}
				containerStyle={styles.btnContainer}
				title="SHOW YOUR PROFIL"
				onPress={() => navigation.navigate("Login")}
			/>
            </View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	viewBody: {
		marginLeft: 30,
		marginRight: 30
	},
	image: {
		height: 300,
		width: '100%',
		marginBottom: 40
	},
	title: {
		fontWeight: 'bold',
		fontSize: 19,
		color: 'blue',
		marginBottom: 10,
		textAlign: 'center'
	},
	description: {
		textAlign: 'center',
		marginBottom: 20
	},
	viewBtn: {
		flex: 1,
		alignItems: 'center'
	},
	btnStyle: {
		backgroundColor: '#00a860'
	},
	btnContainer: {
        width: '70%',
        
	}
});

export default withNavigation(UserGuest)