import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BuyScreenNavigator from './BuyScreenNavigator'
import SellScreenNavigator from './SellScreenNavigator'


const Tab = createBottomTabNavigator()

export function BuySellTab(){

  return (
    <Tab.Navigator
      screenOptions={{
        showLabel: null,
        activeTintColor: '#063f5c',
        inactiveTintColor: 'gray',
        headerShown: false
      }}>
        <Tab.Screen
        name="Buy"
        component={BuyScreenNavigator}
        />

        <Tab.Screen
        name="Sell"
        component={SellScreenNavigator}
        />
      </Tab.Navigator>
  )
}

function ScreenTabNavigator() {
    return (
        <NavigationContainer>
            <BuySellTab/>
        </NavigationContainer>
    );
}

export default ScreenTabNavigator;