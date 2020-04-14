import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Card, Image, Rating } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import { firebaseApp } from '../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import ListTopRestaurants from '../components/Ranking/ListTopRestaurants'
const db = firebase.firestore(firebaseApp);

export default function TopRestaurants(props) {
	const [ restaurants, setRestaurants ] = useState([]);
    const toastRef = useRef();
    const {navigation}= props
	useEffect(() => {
		((async) => {
			db
				.collection('restaurants')
				.orderBy('rating', 'desc')
				.limit(5)
				.get()
				.then((response) => {
					const restaurantsArray = [];
					response.forEach((doc) => {
                        let restaurant= doc.data()
                        restaurant.id =doc.id
						restaurantsArray.push(restaurant);
					});
					setRestaurants(restaurantsArray);
				})
				.catch(() => {
					toastRef.current.show('se jodio, intentelo más tarde', 3000);
				});
		})();
	}, []);
	return (
		<View>
			<ListTopRestaurants restaurants={restaurants} navigation={navigation} />
			<Toast ref={toastRef} position="center" opacity={0.5} />
		</View>
	);
}
