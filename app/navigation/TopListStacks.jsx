import { createStackNavigator } from 'react-navigation-stack'
import TopRestaurantsScreen from '../screens/TopRestaurants'

const TopListStacks = createStackNavigator({
    TopRestaurants: {
        screen:TopRestaurantsScreen,
        navigationOptions:( )=> ({
            title:" Best Restaurants"
        })
    }
})

export default TopListStacks