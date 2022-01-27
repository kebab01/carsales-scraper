import { StyleSheet, Text, View } from 'react-native';
import ScreenNavigator from './ScreenNavigator';
import Home from './screens/Home';

export default function App() {

  return (
    <ScreenNavigator/>
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
