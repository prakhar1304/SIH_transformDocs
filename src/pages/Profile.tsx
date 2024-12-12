import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon, {Icons} from '../common/Icons';
import CommonColors from '../common/CommonColors';

import {useAuth} from '../context/AuthContext'; // Importing your AuthContext

const Profile = () => {
  const {token, isSignedIn, logout} = useAuth();
  const navigation = useNavigation();

  const menuItems = [
    {
      id: '1',
      title: 'Account',
      subtitle: 'Privacy, security, change number',
      icon: (
        <Icon
          type={Icons.AntDesign}
          name={'user'}
          size={24}
          color={CommonColors.TEXT_GRAY}
        />
      ),
      route: 'Account',
    },
    {
      id: '2',
      title: 'Chats',
      subtitle: 'Theme, wallpapers, chat history',
      icon: (
        <Icon
          type={Icons.Ionicons}
          name={'chatbubble-outline'}
          size={24}
          color={CommonColors.TEXT_GRAY}
        />
      ),
      route: 'Chats',
    },
    {
      id: '3',
      title: 'Appearance',
      subtitle: 'Theme, display settings',
      icon: (
        <Icon
          type={Icons.Feather}
          name={'eye'}
          size={24}
          color={CommonColors.TEXT_GRAY}
        />
      ),
      route: 'Appearance',
    },
    {
      id: '4',
      title: 'Notifications',
      subtitle: 'Message, group & call tones',
      icon: (
        <Icon
          type={Icons.Ionicons}
          name={'notifications-outline'}
          size={24}
          color={CommonColors.TEXT_GRAY}
        />
      ),
      route: 'Notifications',
    },
    {
      id: '5',
      title: 'Data Usage',
      subtitle: 'Network usage, auto-download',
      icon: (
        <Icon
          type={Icons.Feather}
          name={'database'}
          size={24}
          color={CommonColors.TEXT_GRAY}
        />
      ),
      route: 'DataUsage',
    },
    {
      id: '6',
      title: 'Help',
      subtitle: 'FAQ, contact us, privacy policy',
      icon: (
        <Icon
          type={Icons.Feather}
          name={'help-circle'}
          size={24}
          color={CommonColors.TEXT_GRAY}
        />
      ),
      route: 'Help',
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login'); // Navigate to login screen after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={CommonColors.STATUSBAR}
        barStyle="dark-content"
      />
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={[CommonColors.GRADIENT_ONE, CommonColors.THEME]}
          style={styles.gradientBackground}>
          <View style={styles.profileCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9',
              }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Hari Bahadur</Text>
              <Text style={styles.lastLogin}>Last Login: April 12, 2023</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.menuContainer}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.route)}>
              <View style={styles.menuItemLeft}>
                {item.icon}
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  {item.subtitle && (
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  )}
                </View>
              </View>
              <Icon
                type={Icons.Entypo}
                name={'chevron-right'}
                size={20}
                color={CommonColors.TEXT_GRAY}
              />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutButton]}
            onPress={handleLogout}>
            <Text style={styles.deleteText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CommonColors.BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  gradientBackground: {
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  lastLogin: {
    fontSize: 16,
    color: CommonColors.TEXT_GRAY,
  },
  menuContainer: {
    marginTop: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: CommonColors.BLACK,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: 12,
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CommonColors.TEXT_GRAY,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: CommonColors.TEXT_GRAY,
  },
  logoutButton: {
    backgroundColor: CommonColors.THEME,
    borderRadius: 8,
    marginTop: 16,
  },
  deleteText: {
    padding: 16,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
