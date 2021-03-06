import React from 'react';
import { Icon } from 'react-native-elements';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import RestaurantsScreenStacks from './RestaurantsStacks';
import TopListScreenStacks from './TopListStacks';
import SearchScreenStacks from './SearchStacks';
import AccountScreenStacks from './AccountStacks';
import FavoritesScreenSatcks from './FavoritesStacks';

const NavigationStacks = createBottomTabNavigator(
	{
		Restaurants: {
			screen: RestaurantsScreenStacks,
			navigationOptions: () => ({
				tabBarLabel: 'Restaurants',
				tabBarIcon: ({ tintColor }) => (
					<Icon type="material-community" name="compass-outline" size={22} color={tintColor} />
				)
			})
		},
		Favorites: {
			screen: FavoritesScreenSatcks,
			navigationOptions: () => ({
				tabBarLabel: 'Favoritos',
				
				tabBarIcon: ({ tintColor }) => (
					<Icon type="material-community" name="heart-outline" size={22} color={tintColor} />
				)
			})
		},
		TopLists: {
			screen: TopListScreenStacks,
			navigationOptions: () => ({
				tabBarLabel: 'Ranking',
				tabBarIcon: ({ tintColor }) => (
					<Icon type="material-community" name="star-outline" size={22} color={tintColor} />
				)
			})
		},
		Search: {
			screen: SearchScreenStacks,
			navigationOptions: () => ({
				tabBarLabel: 'Search',
				tabBarIcon: ({ tintColor }) => (
					<Icon type="material-community" name="magnify" size={22} color={tintColor} />
				)
			})
		},
		Account: {
			screen: AccountScreenStacks,
			navigationOptions: () => ({
				tabBarLabel: 'Account',
				tabBarIcon: ({ tintColor }) => (
					<Icon type="material-community" name="home-outline" size={22} color={tintColor} />
				)
			})
		}
	},
	{
		initialRouteName: 'Restaurants',
		order: [ 'Restaurants','Favorites',  'TopLists', 'Search', 'Account' ],
		tabBarOptions: {
			inactiveTintColor: '#00a5',
			activeTintColor: '#00a680'
		}
	}
);
export default createAppContainer(NavigationStacks);
