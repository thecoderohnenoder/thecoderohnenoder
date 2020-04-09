import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import firebase from 'firebase/app';
import { firebaseApp } from '../../utils/FireBase';
import 'firebase/firestore';
import ListRestaurants from '../../components/restaurants/ListRestaurants';

export default function Restaurants(props) {
	const db = firebaseApp.firestore(firebaseApp);
	const [ restaurants, setRestaurants ] = useState([]);
	const [ startRestaurants, setStartRestaurants ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ totalRestaurants, setTotalRestaurants ] = useState(0);
	const [ isReloadRestaurants, setIsReloadRestaurants ] = useState(false);
	const limitRestaurants = 8;

	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	console.log(restaurants);
	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});
	}, []);

	useEffect(
		() => {
			db.collection('restaurants').get().then((snap) => {
				setTotalRestaurants(snap.size);
			});

			(async () => {
				const resultRestaurants = [];

				const restaurants = db.collection('restaurants').orderBy('createAt', 'desc').limit(limitRestaurants);

				await restaurants.get().then((response) => {
					setStartRestaurants(response.docs[response.docs.length - 1]);

					response.forEach((doc) => {
						let restaurant = doc.data();
						restaurant.id = doc.id;
						resultRestaurants.push({ restaurant });
					});
					setRestaurants(resultRestaurants);
				});
			})();
			setIsReloadRestaurants(false);
		},
		[ isReloadRestaurants ]
	);

	const handleLoadMore = async () => {
		const resultRestaurants = [];
		restaurants.length < totalRestaurants && setIsLoading(true);

		const restaurantsDb = db
			.collection('restaurants')
			.orderBy('createAt', 'desc')
			.startAfter(startRestaurants.data().createAt)
			.limit(limitRestaurants);

		await restaurantsDb.get().then((response) => {
			if (response.docs.length > 0) {
				setStartRestaurants(response.docs[response.docs.length - 1]);
			} else {
				setIsLoading(false);
			}
			response.forEach((doc) => {
				let restaurant = doc.data();
				restaurant.id = doc.id;
				resultRestaurants.push({ restaurant });
			});
			setRestaurants([ ...restaurants, ...resultRestaurants ]);
		});
	};

	return (
		<View style={Styles.viewBody}>
			<ListRestaurants restaurants={restaurants} isLoading={isLoading} handleLoadMore={handleLoadMore} navigation={navigation} />
			{user && <AddRestaurantsButton navigation={navigation} setIsReloadRestaurants={setIsReloadRestaurants} />}
		</View>
	);
}

function AddRestaurantsButton(props) {
	const { navigation, setIsReloadRestaurants } = props;
	return (
		<ActionButton
			buttonColor="#00a680"
			onPress={() => navigation.navigate('AddRestaurants', { setIsReloadRestaurants })}
		/>
	);
}
const Styles = StyleSheet.create({
	viewBody: {
		flex: 1
	}
});
