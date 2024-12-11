import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import CommonColors from '../../common/CommonColors';

const Styles = () => {
  return StyleSheet.create({
    avatar: {
      width: moderateScale(40),
      height: moderateScale(40),
      borderRadius: moderateScale(20),
      marginRight: scale(10),
    },
    userName: {
      fontSize: moderateScale(16),
      color: '#fff',
      fontWeight: '600',
    },
    typingStatus: {
      fontSize: moderateScale(12),
      color: '#fff',
      opacity: 0.7,
    },
    headerIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: 40,
      borderRadius: 50,
      marginHorizontal: 5,
      backgroundColor: CommonColors.WHITE,
    },
    // sendButton: {
    //   marginHorizontal: scale(10),
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   padding: moderateScale(5),
    // },
    inputToolbar: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,

      backgroundColor: `${CommonColors.THEME}10`,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    plusButton: {
      backgroundColor: CommonColors.WHITE,
      borderRadius: 15,
      padding: '1%',
    },
    sendButton: {
      paddingHorizontal: scale(8),
      paddingVertical: scale(8),
      backgroundColor: CommonColors.GRADIENT_ONE,
      borderRadius: 28,
      margin: moderateScale(8),
    },

    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      elevation: 2,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    modalOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
    },
    optionText: {
      marginLeft: 10,
      fontSize: 16,
    },
    closeButton: {
      marginTop: 15,
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: 16,
      color: 'red',
    },
  });
};

export default Styles;
