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
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ScanDoc from './src/ScanDoc';






function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

  return (
    <SafeAreaView style={{flex:1 , backgroundColor:"green"} }>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"white"}
      />
      <ScanDoc />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 
});

export default App;
