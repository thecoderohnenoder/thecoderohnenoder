import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import AddRestaurantsForm from '../../components/restaurants/RestaurantsForm';

export default function AddRestaurants(props) {
	const toastRef = useRef();
	const [ isLoading, setIsLoading ] = useState(false);
	const { navigation } = props;
	const { setIsReloadRestaurants } = navigation.state.params;

	console.log(navigation.state.params);
	return (
		<View>
			<AddRestaurantsForm
				navigation={navigation}
				toastRef={toastRef}
				setIsLoading={setIsLoading}
				setIsReloadRestaurants={setIsReloadRestaurants}
			/>
			<Toast ref={toastRef} position="center" opacity={0.5} />
			<Loading isVisible={isLoading} text="Add Restaurant in Process" />
		</View>
	);
}
