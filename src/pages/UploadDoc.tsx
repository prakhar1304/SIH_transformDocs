import React, {useContext, useState} from 'react';
import {
  View,
  Button,
  Alert,
  Platform,
  PermissionsAndroid,
  Text,
} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import {AuthContext} from '../context/AuthContext';

const UploadPDF: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(true);

  // Request permission on Android
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage to select files.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasPermission(true);
        } else {
          Alert.alert(
            'Permission Denied',
            'Storage access is required to select files.',
          );
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      setHasPermission(true); // iOS doesn't need runtime permissions
    }
  };

  const handleSelectPDF = async () => {
    if (!hasPermission) {
      await requestPermission();
    }

    if (hasPermission) {
      try {
        // Open the document picker
        const result = await DocumentPicker.pick({
          type: [types.pdf], // Allow only PDF files
        });

        // Log the file details
        console.log('Selected File:', result[0]);
        Alert.alert('File Selected', `Name: ${result[0].name}`);
      } catch (err: any) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User canceled the picker');
        } else {
          console.error('Unknown error:', err);
        }
      }
    }
  };

  const {usertoken} = useContext(AuthContext);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'white'}}>bhv</Text>
      <Button title="Select PDF" onPress={handleSelectPDF} />
      {usertoken !== null ? <Text>working</Text> : <Text>not working</Text>}
    </View>
  );
};

export default UploadPDF;
