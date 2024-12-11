import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import BottomNavigator from './BottomNavigator';
import ScanDoc from '../pages/ScanDoc';
import ImageToPDFConverter from '../pages/ImageToPDFConverter';
import UploadPDF from '../pages/UploadDoc';
import ChatBot from '../pages/chatbot/ChatBot';
import SplashScreen from '../pages/SplashScreen';
import Login from '../pages/Login';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={'SplashScreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{animation: 'slide_from_bottom'}}
      />
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
      <Stack.Screen
        name="UploadPdf"
        component={UploadPDF}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen
        name="ChatBot"
        component={ChatBot}
        options={{animation: 'slide_from_bottom'}}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
