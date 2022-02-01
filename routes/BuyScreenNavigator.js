import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import BuyScreen from '../screens/BuyScreen';
import InfoFill from '../screens/InfoFill';
import Results from '../screens/Results';

const Stack = createStackNavigator()

function ScreenStack() {
    return (
      <Stack.Navigator
        initialRouteName="BuyScreen"
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
          name='BuyScreen'
          component={BuyScreen}
          options={{ title: 'Recommend Buy'}}
        />
  
      <Stack.Screen
          name='InfoFill'
          component={InfoFill}
          options={{ title: 'Info'}}
        />
        <Stack.Screen
          name='Results'
          component={Results}
          options={{ title: 'Results'}}
        /> 
      </Stack.Navigator>
    );
  }

export default ScreenStack