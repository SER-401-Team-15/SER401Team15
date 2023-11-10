import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import MYNReportNavigation from './MYNNavigation/MYNReportNavigation';

const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
          name="MYNReportNavigation" 
          component={MYNReportNavigation} 
          options={{ title: 'MYN Report' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
