import React, {useEffect} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';

const {width} = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const {token, isLoading, isSignedIn, logout} = useAuth();
  const scaleAnim = new Animated.Value(0);
  const navigation = useNavigation();

  useEffect(() => {
    // Start the zoom animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Async logic to check user and navigate
    const checkUserAndNavigate = async () => {
      try {
        // Fetch user data
        if (token) {
          navigation.navigate('BottomNavigator'); // Navigate to the bottom tab screen if token exists
        } else {
          setTimeout(() => {
            navigation.navigate('Login'); // Navigate to login screen after delay
          }, 2000); // 2 second delay
        }
      } catch (error) {
        console.error('Error checking user:', error);
        // navigation.navigate('WelcomeScreen'); // Fallback to welcome screen if any error
      }
    };

    // Trigger the check
    checkUserAndNavigate();
  }, [token, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{transform: [{scale: scaleAnim}]}}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: scale(250),
    height: scale(250),
    marginBottom: verticalScale(20),
  },
});

export default SplashScreen;
