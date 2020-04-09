import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Rating, ListItem } from 'react-native-elements';
import Carousel from '../../components/Carousel';
import * as firebase from 'firebase';
import Map from '../../components/Map';
import ListReviews from '../../components/restaurants/ListReviews';


const screenWidth = Dimensions.get('window').width;

export default function Restaurant(props) {
	const { navigation } = props;
	const { restaurant } = navigation.state.params.restaurant.item;
	const [ imagesRestaurant, setImagesRestaurant ] = useState([]);
	const [ rating, setRating] =useState(restaurant.rating)

	useEffect(() => {
		const arrayUrls = [];
		(async () => {
			await Promise.all(
				restaurant.images.map(async (idImage) => {
					await firebase.storage().ref(`restaurant-images/${idImage}`).getDownloadURL().then((imageUrl) => {
						arrayUrls.push(imageUrl);
					});
				})
			);
			setImagesRestaurant(arrayUrls);
		})();
	}, []);

	return (
		<ScrollView style={Styles.viewBody}>
			<Carousel arrayImages={imagesRestaurant} width={screenWidth} height={250} />
			<TitleRestaurant name={restaurant.name} description={restaurant.description} rating={rating} />
			<RestaurantInfo location={restaurant.location} name={restaurant.name} address={restaurant.address} />
			<ListReviews
             navigation={navigation}
			 idRestaurant={restaurant.id}
			 setRating={setRating}
			/>
		</ScrollView>
	);
}

function TitleRestaurant(props) {
	const { name, description, rating } = props;
	return (
		<View style={Styles.viewRestaurantTitle}>
			<View style={{ flexDirection: 'row' }}>
				<Text style={Styles.nameRestaurant}>{name}</Text>
				<Rating style={Styles.rating} imageSize={20} readonly startingValue={parseFloat(rating)} />
			</View>
			<Text style={Styles.descriptionRestaurant}>{description}</Text>
		</View>
	);
}

function RestaurantInfo(props) {
	const { location, name, address } = props;

	const listInfo =[
		{
			text:address,
			iconName: "map-marker",
			iconType:"material-community",
			action: null
		},
		{
			text: "11 222 366565",
			iconName: "phone",
			iconType:"material-community",
			action:null
		},
		{
			text: "Olimpia@gmail.com",
			iconName: "at",
			iconType:"material-community",
			action:null
		}
	]
	return (
		<View style={Styles.viewRestaurantInfo}>
			<Text style={Styles.restaurantInfoTitle}>Featured restaurant Information</Text>
			<Map location={location} name={name} height={130} />
			{listInfo.map((item,index)=>(
				<ListItem
					key={index}
					title={item.text}
					leftIcon={{
						name:item.iconName,
						type: item.iconType,
						color:"#00a680"
					}}
					containerStyle={Styles.containerListItem}
				/>
			))}
		</View>
	);
}

const Styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	viewRestaurantTitle: {
		margin: 12
	},
	nameRestaurant: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	rating: {
		position: 'absolute',
		right: 0
	},
	descriptionRestaurant: {
		marginTop: 5,
		color: 'grey'
	},
	viewRestaurantInfo: {
		marginTop: 25,
		margin: 15
	},
	restaurantInfoTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10
	},
	containerListItem:{
		borderBottomColor: "#d8d8d8",
		borderBottomWidth:1
	},
})
