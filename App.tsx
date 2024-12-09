import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ScanDoc from './src/ScanDoc';
import UploadPDF from './src/pages/UploadDoc';
import {AuthProvider} from './src/context/AuthContext';
import AppNavigation from './src/navigation/AppNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

function App(): React.JSX.Element {
  //   const isDarkMode = useColorScheme() === 'dark';

  //   const backgroundStyle = {
  //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //   };
  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
