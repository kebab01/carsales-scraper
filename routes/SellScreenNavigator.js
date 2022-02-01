import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import SellScreen from '../screens/SellScreen';

const Stack = createStackNavigator()

function ScreenStack() {
    return (
      <Stack.Navigator
        initialRouteName="SellScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#128cde',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          gestureEnabled: true,
        }}
      >
        <Stack.Screen
          name='SellScreen'
          component={SellScreen}
          options={{ title: 'Sell'}}
        />
      </Stack.Navigator>
    );
  }

export default ScreenStack