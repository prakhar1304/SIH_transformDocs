import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';
import ScanDoc from '../ScanDoc';
import ImageToPDFConverter from '../pages/ImageToPDFConverter';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="BottomNavigator"
        component={BottomNavigator}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="ScanDoc"
        component={ScanDoc}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="ImageToPDf"
        component={ImageToPDFConverter}
        options={{animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
