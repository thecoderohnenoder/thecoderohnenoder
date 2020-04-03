import React from 'react';
import { View,Text } from 'react-native'
import ActionButton from 'react-native-action-button'

export default function Restaurants(){
    return(
        <View>
            <Text>Estamos en Restaurantes</Text>
            <AddRestaurantsButton/>
        </View>
    )
}

function AddRestaurantsButton(){
    return(
        <ActionButton
            buttonColor="#00a680"
            onPress={()=> console.log("navegando a add restaurants")}
        />
    )
}