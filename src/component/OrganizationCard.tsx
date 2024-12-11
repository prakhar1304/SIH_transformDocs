// components/OrganizationCard.js

import CommonColors from '../common/CommonColors';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from 'react-native-size-matters';

const {width} = Dimensions.get('window');

const OrganizationCard = ({org, onPress}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      {/* <ImageBackground
        source={require('../assets/images/blur.png')} // Add your background image
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}> */}
      <LinearGradient
        colors={[CommonColors.WHITE, CommonColors.WHITE]}
        style={styles.gradient}>
        <View style={styles.contentContainer}>
          <Image source={{uri: org.logoUrl}} style={styles.logo} />
          <View style={styles.textContainer}>
            <Text style={styles.orgName}>{org.name}</Text>
            <Text style={styles.department}>{org.department}</Text>
            <Text style={styles.adminName}>Admin: {org.adminName}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View </Text>
        </TouchableOpacity>
      </LinearGradient>
      {/* </ImageBackground> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 200,
    width: width - 32,
    marginVertical: 10,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: CommonColors.BLACK,
    borderWidth: 1,
  },

  backgroundImageStyle: {
    borderRadius: 20,
  },
  gradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
    elevation: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  textContainer: {
    marginLeft: 15,
    flex: 1,
  },
  orgName: {
    fontSize: 22,
    // fontWeight: 'bold',
    color: CommonColors.BLACK,
    marginBottom: 4,
    fontFamily: 'Mulish-Black',
  },
  department: {
    fontSize: 16,
    color: CommonColors.GRAY,
    opacity: 0.9,
    marginBottom: 4,
  },
  adminName: {
    fontSize: 14,
    color: CommonColors.GRAY,
    opacity: 0.8,
    marginBottom: 2,
  },
  documentCount: {
    fontSize: 14,
    color: CommonColors.BLACK,
    opacity: 0.8,
  },
  viewButton: {
    backgroundColor: CommonColors.BLACK,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: CommonColors.THEME,
    width: scale(300),
    alignItems: 'center',
  },
  viewButtonText: {
    color: CommonColors.WHITE,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default OrganizationCard;
