


import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';




const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{ animation: 'slide_from_bottom' }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;