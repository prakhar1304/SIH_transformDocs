import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon, {Icons} from '../../common/Icons';
import CommonStyles from '../../common/CommonStyles';

import {useNavigation} from '@react-navigation/native';
import CommonColors from '../../common/CommonColors';
import LinearGradient from 'react-native-linear-gradient';
import {verticalScale} from 'react-native-size-matters';
const Header = (props: any) => {
  const {title} = props;
  const navigation = useNavigation();

  //   const commonStyles = CommonStyles('lack');
  return (
    <LinearGradient
      colors={[CommonColors.GRADIENT_ONE, CommonColors.THEME]}
      style={Style.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          type={Icons.Fontisto}
          name={'angle-left'}
          size={18}
          style={{marginEnd: 15}}
          color={CommonColors.WHITE}
        />
      </TouchableOpacity>
      <Text style={{color: CommonColors.WHITE, fontSize: 20}}>{title}</Text>
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
  },
});

export default Header;
