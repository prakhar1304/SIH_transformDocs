import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../pages/Login';
import Icon, {Icons} from '../common/Icons';
import CommonColors from '../common/CommonColors';
import UploadPDF from '../pages/UploadDoc';

const Tab = createBottomTabNavigator();

interface AnimatedIconProps {
  focused: boolean;
  children: React.ReactNode;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({focused, children}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{transform: [{scale: scaleAnim}]}}>
      {children}
    </Animated.View>
  );
};

const BottomNavigator = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
        }}>
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AnimatedIcon focused={focused}>
                <View
                  style={[
                    styles.PopContainer,
                    {
                      backgroundColor: focused
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'transparent',
                    },
                  ]}>
                  <Icon
                    type={Icons.AntDesign}
                    name="home"
                    size={25}
                    color={
                      focused ? CommonColors.WHITE : 'rgba(255, 255, 255, 0.6)'
                    }
                  />
                </View>
              </AnimatedIcon>
            ),
          }}
        />

        <Tab.Screen
          name="UploadPdf"
          component={UploadPDF}
          options={{
            tabBarIcon: ({focused}: {focused: boolean}) => (
              <AnimatedIcon focused={focused}>
                <View
                  style={[
                    styles.PopContainer,
                    {
                      backgroundColor: focused
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'transparent',
                    },
                  ]}>
                  <Icon
                    type={Icons.Entypo}
                    name="upload"
                    size={25}
                    color={
                      focused ? CommonColors.WHITE : 'rgba(255, 255, 255, 0.6)'
                    }
                  />
                </View>
              </AnimatedIcon>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabBarStyle: {
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopWidth: 0,
    paddingBottom: 5,
    paddingTop: 5,
  },

  PopContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default BottomNavigator;
