import CommonStyles from '../common/CommonStyles';
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
const {width} = Dimensions.get('window');

const SplashScreen: React.FC = ({navigation}: any) => {
  const commonStyles = CommonStyles('white');
  const scaleAnim = new Animated.Value(0);

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

        // Delay to show splash screen
        setTimeout(() => {
          navigation.navigate('Login');

          // navigation.navigate('WelcomeScreen');
        }, 2000); // 2 second delay
      } catch (error) {
        console.error('Error checking user:', error);
        navigation.navigate('WelcomeScreen');
      }
    };

    // Trigger the check
    checkUserAndNavigate();

    // Cleanup
    return () => {};
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{transform: [{scale: scaleAnim}]}}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      {/* <Text style={styles.textName}>Your App Name</Text> */}
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
    width: scale(200),
    height: scale(200),
    marginBottom: verticalScale(20),
  },
  textName: {
    fontSize: moderateScale(24),
    color: 'black',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
