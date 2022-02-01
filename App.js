import { StyleSheet, Text, View } from 'react-native';
import ScreenTabNavigator from './routes/ScreenTabNavigator';
import './global'

export default function App() {

  return (
    <ScreenTabNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
