import { createStackNavigator } from 'react-navigation-stack';
import RestaurantsScreen from '../screens/Restaurants';
import AddRestaurantsScreen from '../screens/Restaurants/AddRestaurants';
import RestaurantScreen from '../screens/Restaurants/Restaurant';
import AddReviewRestaurantScreen from '../screens/Restaurants/AddReviewRestaurant';

const RestaurantsScreenStacks = createStackNavigator({
	Restaurants: {
		screen: RestaurantsScreen,
		navigationOptions: () => ({
			title: 'Der Kasseler'
		})
	},
	
	AddRestaurants: {
		screen: AddRestaurantsScreen,
		navigationOptions: () => ({
			title: 'add new Restaurant'
		})
	},
	Restaurant: {
		screen: RestaurantScreen,
		navigationOptions: (props) => ({
			title: props.navigation.state.params.restaurant.name
		})
	},
	AddReviewRestaurant: {
		screen: AddReviewRestaurantScreen,
		navigationOptions: () => ({
			title: 'new commentary'
		})
	}
});

export default RestaurantsScreenStacks;
