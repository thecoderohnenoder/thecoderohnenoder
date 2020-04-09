import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { AirbnbRating, Button, Input } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Loading from '../../components/Loading';

const db = firebase.firestore(firebaseApp);

export default function AddReviewRestaurant(props) {
	const { navigation } = props;
	const { idRestaurant, setReviewsReload } = navigation.state.params;
	const [ rating, setRating ] = useState(null);
	const [ title, setTitle ] = useState('');
	const [ review, setReview ] = useState('');
	const toastRef = useRef();
	const [ isLoading, SetIsLoading ] = useState(false);
	
	const addReview = () => {
		if (rating === null) {
			toastRef.current.show('no has dado puntuaciojhn');
		} else if (!title) {
			toastRef.current.show('el titulo es oblicgalori');
		} else if (!review) {
			toastRef.current.show('el comentario es obligatorio');
		} else {
			SetIsLoading(true);
			const user = firebase.auth().currentUser;

			const payload = {
				idUser: user.uid,
				avatarUser: user.photoURL,
				idRestaurant: idRestaurant,
				title: title,
				review: review,
				rating: rating,
				createAt: new Date()
			};
			db
				.collection('reviews')
				.add(payload)
				.then(() => {
					updateRestaurant();
				})
				.catch(() => {
					toastRef.current.show('no se pudo guardar jodete');
					SetIsLoading(false);
				});
		}
	};

	const updateRestaurant = () => {
		const restaurantRef = db.collection('restaurants').doc(idRestaurant);

		restaurantRef.get().then((response) => {
			const restaurantData = response.data();
			const ratingTotal = restaurantData.ratingTotal + rating;
			const quantityVoting = restaurantData.quantityVoting + 1;
			const ratingResult = ratingTotal / quantityVoting;

			restaurantRef.update({ rating: ratingResult, ratingTotal, quantityVoting }).then(() => {
				setReviewsReload(true)
				SetIsLoading(false);
				navigation.goBack();
			});
		});
	};
	return (
		<View style={Styles.viewBody}>
			<View style={Styles.viewRating}>
				<AirbnbRating
					count={5}
					reviews={[ 'Appalling', 'Deficient', 'normal', 'very good', 'Excellent' ]}
					defaultRating={0}
					size={35}
					onFinishRating={(value) => setRating(value)}
				/>
			</View>
			<View style={Styles.formReview}>
				<Input
					placeholder=" Title"
					containerStyle={Styles.input}
					onChange={(e) => setTitle(e.nativeEvent.text)}
				/>
				<Input
					placeholder=" Comment"
					inputContainerStyle={Styles.textArea}
					multiline={true}
					onChange={(e) => setReview(e.nativeEvent.text)}
				/>

				<Button
					buttonStyle={Styles.btnSendRating}
					title="Put comment"
					onPress={addReview}
					titleStyle={{ fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', color: 'red' }}
					containerStyle={Styles.btnContainer}
				/>
			</View>
			<Toast ref={toastRef} position="center" opacity={0.5} />
			<Loading isVisible={isLoading} text="Comment sending " />
		</View>
	);
}

const Styles = StyleSheet.create({
	viewBody: {
		flex: 1
	},
	viewRating: {
		height: 110,
		backgroundColor: '#f22'
	},

	formReview: {
		margin: 10,
		alignItems: 'center',
		marginTop: 40,
		flex: 1
	},
	btnSendRating: {
		backgroundColor: 'yellowgreen'
	},
	input: {
		marginBottom: 10
	},
	textArea: {
		height: 200,
		width: '100%',
		padding: 0,
		margin: 0
	},
	btnContainer: {
		justifyContent: 'flex-end',
		flex: 1,
		marginBottom: 20,
		marginTop: 20,
		width: '95%'
	}
});
