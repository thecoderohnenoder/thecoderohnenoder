import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

import { Image } from 'react-native-elements';
import * as firebase from 'firebase';

export default function ListRestaurants(props) {
	const { restaurants, isLoading, handleLoadMore, navigation } = props;

	return (
		<View>
			{restaurants ? (
				<FlatList
					data={restaurants}
					renderItem={(restaurant) => <Restaurant restaurant={restaurant}  navigation={navigation}/>}
					keyExtractor={(item, index) => index.toString()}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.5}
					ListFooterComponent={<FooterList isLoading={isLoading} />}
				/>
			) : (
				<View style={Styles.loaderRestaurants}>
					<ActivityIndicator size="large" />
					<Text>Loading restaurants</Text>
				</View>
			)}
		</View>
	);
}
function Restaurant(props) {
	const { restaurant, navigation } = props;
	const { name, address, description, images } = restaurant.item.restaurant;
	const [ imageRestaurant, setImageRestaurant ] = useState(null);

	useEffect(() => {
		const image = images[0];
		firebase.storage().ref(`restaurant-images/${image}`).getDownloadURL().then((result) => {
			setImageRestaurant(result);
		});
	}, []);

	return (
		<TouchableOpacity onPress={() => navigation.navigate("Restaurant",{restaurant})}>
			<View style={Styles.viewRestaurant}>
				<View style={Styles.viewRestaurantImage}>
					<Image
						resizeMode="cover"
						source={{ uri: imageRestaurant }}
						style={Styles.imageRestaurant}
						PlaceholderContent={<ActivityIndicator color="#fff" />}
					/>
				</View>
				<View>
					<Text style={Styles.restaurantName}>{name}</Text>
					<Text style={Styles.restaurantAddress}>{address}</Text>
					<Text style={Styles.restaurantDescription}>{description.substr(0, 60)}...</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
function FooterList(props) {
	const { isLoading } = props;
	
	if (isLoading) {
		return (
			<View style={Styles.loadingRestaurants}>
				<ActivityIndicator size="large" />
			</View>
		);
	} else {
		return (
			<View style={Styles.notFoundRestaurants}>
				<Text>RESTAURANTS ARE NOT LEFT</Text>
			</View>
		);
	}
}

const Styles = StyleSheet.create({
	loadingRestaurants: {
		marginTop: 20,
		alignItems: 'center'
	},
	viewRestaurant: {
		flexDirection: 'row',
		margin: 10
	},
	viewRestaurantImage: {
		marginRight: 15
	},
	imageRestaurant: {
		width: 80,
		height: 80
	},
	restaurantName: {
		fontWeight: 'bold'
	},
	restaurantAddress: {
		paddingTop: 2,
		color: 'grey'
	},
	restaurantDescription: {
		paddingTop: 2,
		color: 'grey',
		width: 300,
		fontStyle: 'italic'
	},
	loaderRestaurants: {
		marginTop: 10,
		marginBottom: 20
	},
	notFoundRestaurants: {
		marginTop: 10,
		marginBottom: 20,
		alignItems: 'center'
	}
});
