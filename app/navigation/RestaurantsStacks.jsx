import { createStackNavigator } from 'react-navigation-stack';
import RestaurantsScreen from '../screens/Restaurants';

const RestaurantsScreenStacks = createStackNavigator({
	Restaurants: {
		screen: RestaurantsScreen,
		navigationOptions: () => ({
			title: 'Der Kasseler'
		})
	}
});

export default RestaurantsScreenStacks;
