import React from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4A7AFF" barStyle="light-content" />
      <View style={styles.formContainer}>
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.CentureContainer}>
            <Text style={styles.login}>Login</Text>
            <Text style={styles.smallTxt}>
              In order to login your account please enter credentials
            </Text>

            <View
              style={[styles.inputContainer, {marginTop: verticalScale(10)}]}>
              <View style={styles.inputIconView}>
                <Icon name="gmail" size={moderateScale(18)} color="#fff" />
              </View>
              <TextInput
                style={styles.inputs}
                placeholder="Enter Email Id"
                keyboardType="email-address"
                underlineColorAndroid="transparent"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputIconView}>
                <Icon name="key" size={moderateScale(18)} color="#fff" />
              </View>
              <TextInput
                style={styles.inputs}
                placeholder="Enter Password"
                secureTextEntry
                underlineColorAndroid="transparent"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('BottomNavigator')}>
            <Text style={styles.btnText}>Login Now</Text>
          </TouchableOpacity>

          <View style={styles.contactView}>
            <Text style={styles.smallTxt}>New user?</Text>
            <TouchableOpacity style={{marginLeft: scale(4)}}>
              <Text style={styles.register}>Register Now</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  CentureContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(180),
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  inputs: {
    borderBottomColor: '#fff',
    flex: 1,
    color: '#000',
    paddingLeft: scale(10),
    fontSize: moderateScale(14),
  },
  inputContainer: {
    borderRadius: moderateScale(15),
    height: verticalScale(48),
    width: scale(280),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: verticalScale(30),
    elevation: 2,
  },
  inputIconView: {
    width: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A7AFF',
    height: '100%',
    borderRadius: moderateScale(15),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  smallTxt: {
    fontSize: moderateScale(13),
    color: '#000',
    marginTop: verticalScale(10),
    opacity: 0.5,
    textAlign: 'center',
  },
  register: {
    fontSize: moderateScale(13),
    marginTop: verticalScale(12),
    textAlign: 'center',
    color: '#4A7AFF',
    textDecorationLine: 'underline',
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  btnText: {
    color: '#fff',
    fontSize: moderateScale(14),
    marginTop: verticalScale(2),
  },
  btn: {
    backgroundColor: '#4A7AFF',
    width: '100%',
    height: verticalScale(50),
    borderRadius: moderateScale(30),
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  login: {
    alignSelf: 'center',
    color: '#4A7AFF',
    fontSize: moderateScale(25),
    marginTop: verticalScale(10),
  },
});

export default Login;
