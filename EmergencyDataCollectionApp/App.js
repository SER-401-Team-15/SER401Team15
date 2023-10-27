import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import NavigationBar from './components/navigation/NavigationBar';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
    <NavigationBar></NavigationBar>
      <View style={styles.container}>
        <Text>Hello SER401!</Text>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff2200',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:StatusBar.currentHeight,
  },
});
