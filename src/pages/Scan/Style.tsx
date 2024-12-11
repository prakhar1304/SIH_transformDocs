import {StyleSheet, Dimensions} from 'react-native';
import {verticalScale, moderateScale, scale} from 'react-native-size-matters';
import CommonColors from '../../common/CommonColors';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonColors.BACKGROUND_COLOR,
  },

  // Content Container
  contentContainer: {
    flex: 1,
    padding: moderateScale(16),
  },

  // File Name Input Styles
  fileNameInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  fileNameInput: {
    flex: 1,
    height: verticalScale(50),
    backgroundColor: CommonColors.WHITE,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    fontSize: moderateScale(16),
    color: CommonColors.BLACK,
    borderWidth: 1,
    borderColor: CommonColors.GRAY,
    marginRight: scale(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doneButton: {
    backgroundColor: CommonColors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(12),
    shadowColor: CommonColors.PRIMARY,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  doneButtonText: {
    color: CommonColors.WHITE,
    fontWeight: '600',
    fontSize: moderateScale(14),
  },

  // File Name Display
  fileNameDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CommonColors.WHITE,
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: CommonColors.GRAY,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fileNameText: {
    marginLeft: scale(10),
    fontSize: moderateScale(16),
    color: CommonColors.THEME,
  },

  // Upload Area
  uploadArea: {
    padding: moderateScale(20),
    borderWidth: 2,
    borderColor: CommonColors.PRIMARY,
    borderStyle: 'dashed',
    borderRadius: moderateScale(12),
    alignItems: 'center',
    backgroundColor: CommonColors.WHITE,
    marginBottom: verticalScale(16),
    shadowColor: CommonColors.PRIMARY,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadText: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: CommonColors.PRIMARY,
    marginBottom: verticalScale(4),
    marginTop: verticalScale(8),
  },
  uploadSubText: {
    fontSize: moderateScale(14),
    color: CommonColors.GRADIENT_ONE,
  },

  // Image Scroll View
  imageScrollView: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(8),
  },
  imageWrapper: {
    marginBottom: verticalScale(16),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    height: verticalScale(200),
    borderRadius: moderateScale(12),
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(48),
    justifyContent: 'center',
    paddingHorizontal: scale(12),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imageNumber: {
    color: CommonColors.WHITE,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },

  // Button Container
  buttonContainer: {
    marginTop: verticalScale(10),
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(12),
  },
  actionButton: {
    flex: 1,
    backgroundColor: CommonColors.PRIMARY,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginHorizontal: scale(4),
    shadowColor: CommonColors.PRIMARY,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  actionButtonText: {
    color: CommonColors.WHITE,
    fontWeight: '600',
    fontSize: moderateScale(14),
  },

  // Disabled State
  disabledButton: {
    opacity: 0.5,
  },
});

export default style;
