import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList} from 'react-native';
import { Button, Avatar, Rating } from 'react-native-elements';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

export default function ListReviews(props) {
	const { navigation, idRestaurant, setRating } = props;
	const [ reviews, setReviews ] = useState([]);
	const [ reviewsReload, setReviewsReload ] = useState(false);

	useEffect(
		() => {
			((async) => {
				const resultReviews = [];
				const arrayRating = [];
				db.collection('reviews').where('idRestaurant', '==', idRestaurant).get().then((response) => {
					response.forEach((doc) => {
						resultReviews.push(doc.data());
						arrayRating.push(doc.data().rating);
					});
					let numSum = 0;
					arrayRating.map((value) => {
						numSum = numSum + value;
					});
					const countRating = arrayRating.length;
					const resultRating = numSum / countRating;
					const resultRatingFinish = resultRating ? resultRating : 0;
					setRating(resultRatingFinish);
					setReviews(resultReviews);
				});
				setReviewsReload(false);
			})();
		},
		[ reviewsReload ]
	);
	return (
		<View>
			<Button
				buttonStyle={Styles.btnAddReview}
				titleStyle={Styles.btnTitleAddReview}
				title="commentary"
				icon={{
					type: 'material-community',
					name: 'square-edit-outline',
					color: '#00a680'
				}}
				onPress={() =>
					navigation.navigate('AddReviewRestaurant', {
						idRestaurant: idRestaurant,
						setReviewsReload: setReviewsReload
					})}
			/>
			<FlatList
			data={reviews}
			renderItem={review => <Review review={review}/>}
			keyExtractor={(item, index)=> index.toString }
			/>
		</View>
	);
}
function Review(props) {
	const {title, review, rating, createAt, avatarUser}= props.review.item
	const createReviewDate = new Date(createAt.seconds * 1000)
console.log(createReviewDate)

	return(
		<Text>Hoal lo ..............</Text>
	)
}
const Styles = StyleSheet.create({
	btnAddReview: {
		backgroundColor: 'transparent'
	},
	btnTitleAddReview: {
		color: '#00a680'
	}
});
