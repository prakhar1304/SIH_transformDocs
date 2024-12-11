import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CommonColors from '../common/CommonColors';
import Icon, {Icons} from '../common/Icons';

const MainHeader = (props: any) => {
  const {title} = props;
  const navigation = useNavigation();

  //   const commonStyles = CommonStyles('lack');
  return (
    <LinearGradient
      colors={[CommonColors.GRADIENT_ONE, CommonColors.THEME]}
      style={Style.container}>
      <TouchableOpacity onPress={() => {}}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/6109/6109270.png',
          }}
          style={Style.profileImage}
        />
      </TouchableOpacity>
      <Text style={Style.Title}>{title}</Text>
      <View>
        <Icon
          type={Icons.FontAwesome}
          name={'bell'}
          size={20}
          color={CommonColors.WHITE}
        />
      </View>
    </LinearGradient>
  );
};
const Style = StyleSheet.create({
  container: {
    height: verticalScale(60),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  profileImage: {
    height: moderateScale(40),
    width: moderateScale(40),
  },
  Title: {
    color: CommonColors.WHITE,
    fontSize: 20,
  },
});

export default MainHeader;
