import { createStackNavigator } from 'react-navigation-stack';
import RestaurantsScreen from '../screens/Restaurants';
import AddRestaurants from '../screens/Restaurants/AddRestaurants';

const RestaurantsScreenStacks = createStackNavigator({
	Restaurants: {
		screen: RestaurantsScreen,
		navigationOptions: () => ({
			title: 'Der Kasseler'
		})
	},
	AddRestaurants: {
		screen: AddRestaurants,
		navigationOptions: () => ({
			title: 'add new Restaurant'
		})
	}
});

export default RestaurantsScreenStacks;
