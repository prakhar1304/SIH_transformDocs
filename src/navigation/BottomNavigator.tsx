import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import Icon, {Icons} from '../common/Icons';
import CommonColors from '../common/CommonColors';

// Import your screens

import Login from '../pages/Login';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const Tab = createBottomTabNavigator();

const AddButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleOptionPress = (screen: string) => {
    setModalVisible(false);
    navigation.navigate(screen);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Icon
          type={Icons.Feather}
          name="plus"
          size={30}
          color={CommonColors.WHITE}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress('ScanDoc')}>
              <Icon
                type={Icons.Feather}
                name="camera"
                size={24}
                color={CommonColors.WHITE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionPress('UploadPdf')}>
              <Icon
                type={Icons.Feather}
                name="upload"
                size={24}
                color={CommonColors.WHITE}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
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
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <Icon
                  type={Icons.AntDesign}
                  name="home"
                  size={24}
                  color={focused ? CommonColors.THEME : CommonColors.BLACK}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={View}
          options={{
            tabBarIcon: () => <AddButton />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.tabIconContainer}>
                <Icon
                  type={Icons.Ionicons}
                  name="chatbubble-outline"
                  size={24}
                  color={focused ? CommonColors.THEME : CommonColors.BLACK}
                />
              </View>
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
    backgroundColor: CommonColors.WHITE,
    borderTopWidth: 0,
    position: 'absolute',
    elevation: 0,
    borderTopColor: 'transparent',
  },
  addButton: {
    backgroundColor: CommonColors.BLACK,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#FF4141',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    paddingBottom: 80,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  option: {
    backgroundColor: CommonColors.BLACK,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF4141',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
});

export default BottomNavigator;
