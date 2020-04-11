import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image, Icon } from 'react-native-elements';

import { firebaseApp } from '../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);

export default function Favorites(props) {
	const { navigation } = props;
	const [ restaurants, setRestaurants ] = useState([]);

	useEffect(() => {
		const idUser = firebase.auth().currentUser.uid;
		db.collection('favorites').where('idUser', '==', idUser).get().then((response) => {
			const idRestaurantsArray = [];
			response.forEach((doc) => {
				idRestaurantsArray.push(doc.data().idRestaurant);
			});
			getDataRestaurants(idRestaurantsArray).then((response) => {
				const restaurants = [];
				response.forEach((doc) => {
					let restaurant = doc.data();
					restaurant.id = doc.id;
					restaurants.push(restaurant);
				});
				setRestaurants(restaurants);
			});
		});
	}, []);

	const getDataRestaurants = (idRestaurantsArray) => {
		const arrayRestaurants = [];
		idRestaurantsArray.forEach((idRestaurant) => {
			const result = db.collection('restaurants').doc(idRestaurant).get();
			arrayRestaurants.push(result);
		});

		return Promise.all(arrayRestaurants);
	};

	return (
		<View style={Styles.viewBody}>
			{restaurants ? (
				<FlatList
					data={restaurants}
					renderItem={(restaurant) => <Restaurant restaurant={restaurant} navigation={navigation} />}
					keyExtractor={(item, index) => index.toString()}
				/>
			) : (
				<View style={Styles.loaderRestaurants}>
					<ActivityIndicator size="large" />
					<Text>Cargando Restaurante</Text>
				</View>
			)}
		</View>
	);
}
function Restaurant(props) {
	const { restaurant, navigation } = props;
	const { name, images } = restaurant.item;
	const [imageRestaurant, setImageRestaurant]=useState(null)
	useEffect(() => {
		const image = images[0];
		firebase.storage().ref(`restaurant-images/${image}`).getDownloadURL().then((response) => {
			setImageRestaurant(response)
		});
	}, []);
	return (
		<View style={Styles.restaurant}>
			<TouchableOpacity onPress={()=> console.log('ir al restaurante')}>
				<Image
					resizeMode="cover"
					source={{uri: imageRestaurant}}
					style={Styles.image}
					PlaceholderContent={<ActivityIndicator color='#545434'/>}
				/>
			</TouchableOpacity>
			<View style={Styles.info}>
             <Text style={Styles.name}>{name}</Text>
			 <Icon
				 type="material-community"
				 name="heart"
				 color='#00a680'
				 containerStyle={Styles.favorite}
				 onPress={()=> console.log('eliminir favoritos')}
				 size={40}
				 underlayColor="transparent"
			 />
			</View>
		</View>
	);
}
const Styles = StyleSheet.create({
	loaderRestaurants: {
		marginTop: 10,
		marginBottom: 10
	},
	viewBody: {
		flex: 1,
		backgroundColor: '#f2f2f2'
	},
	restaurant:{
		margin:10

	},
	image:{
		width:"100%",
		height:180
	},
	info:{
		flex:1,
		alignItems:'center',
		justifyContent:'space-between',
		flexDirection:'row',
		paddingLeft:20,
		paddingRight:20,
		paddingTop:10,
		paddingBottom:10,
		marginTop: -30,
		backgroundColor: '#fff'
	},
	name:{
		fontWeight:'bold',
		fontSize:20
	},
	favorite:{
		marginTop: -35,
		backgroundColor:'#fff',
		padding:15,
		borderRadius:100
	}
});
