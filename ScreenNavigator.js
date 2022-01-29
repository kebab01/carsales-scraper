import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import InfoFill from './screens/InfoFill';
import Results from './screens/Results';

const { Screen, Navigator } = createNativeStackNavigator();

/**
 * Navigation stack for all main screens
 * @returns 
 */
function ScreenStack() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#07b524',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        gestureEnabled: true,
      }}
    >
      <Screen
        name='Home'
        component={Home}
        options={{ title: 'Home'}}
      />

    <Screen
        name='InfoFill'
        component={InfoFill}
        options={{ title: 'Info'}}
      />
      <Screen
        name='Results'
        component={Results}
        options={{ title: 'Results'}}
      /> 
    </Navigator>
  );
}
function ScreenNavigator() {
    return (
        <NavigationContainer>
            {ScreenStack()}
        </NavigationContainer>
    );
}

export default ScreenNavigator;