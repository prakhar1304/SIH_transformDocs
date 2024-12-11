import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import {AuthContext} from '../context/AuthContext';
import Icon, {Icons} from '../common/Icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../component/header/Index';
import CommonColors from '../common/CommonColors';
import {verticalScale} from 'react-native-size-matters';
import RNFS from 'react-native-fs';

interface PDFFile {
  name: string;
  uri: string;
  type: string;
}

interface UploadResponse {
  data: {
    url: string;
    key: string;
    fileName: string;
    fileType: string;
    isMachineReadable: boolean;
    needsConversion: boolean;
  };
}

const API_URL = 'https://d642-125-18-25-132.ngrok-free.app/api/upload';

const UploadScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState(true);
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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
    }
  };

  const convertToBase64 = async (uri: string): Promise<string> => {
    try {
      // Read the file content
      const fileContent = await RNFS.readFile(uri, 'base64');
      return `data:application/pdf;base64,${fileContent}`;
    } catch (error) {
      console.error('Error converting file to base64:', error);
      throw error;
    }
  };

  const uploadFile = async (file: PDFFile) => {
    try {
      setIsUploading(true);
      console.log('Starting file upload to:', API_URL);
      const fileContent = await convertToBase64(file.uri);
      console.log('File converted to base64, size:', fileContent.length);

      console.log('Uploading to:', API_URL);
      console.log('File size:', fileContent.length);
      console.log('File Name:', file.name);
      // console.log('File Name:', fileContent);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: 'application/pdf',
          fileContent,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', response.status, errorText);
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }

      const result: UploadResponse = await response.json();
      console.log('Upload success:', result.data);
      Alert.alert('Success', 'File uploaded successfully');
      return result.data;
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload file');
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectPDF = async () => {
    if (!hasPermission) {
      await requestPermission();
    }

    if (hasPermission) {
      try {
        const result = await DocumentPicker.pick({
          type: [types.pdf],
        });

        const newFile = {
          name: result[0].name,
          uri: result[0].uri,
          type: result[0].type || 'application/pdf',
        };

        setPdfFiles(prevFiles => [...prevFiles, newFile]);
      } catch (err: any) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User canceled the picker');
        } else {
          console.error('Unknown error:', err);
        }
      }
    }
  };

  const handleConvert = async (file: PDFFile) => {
    try {
      await uploadFile(file);
    } catch (error) {
      console.error('Conversion error:', error);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={CommonColors.GRADIENT_ONE}
        barStyle={'default'}
      />
      <Header title={'Upload Document'} />

      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.uploadArea}
          onPress={handleSelectPDF}
          disabled={isUploading}>
          <Icon type={Icons.AntDesign} name={'filetext1'} size={20} />
          <Text style={styles.uploadText}>
            {isUploading ? 'Uploading...' : 'Tap to Upload PDF'}
          </Text>
          <Text style={styles.uploadSubText}>
            Select PDF files from your device
          </Text>
        </TouchableOpacity>

        <View style={styles.fileListContainer}>
          {pdfFiles.map((file, index) => (
            <View key={index} style={styles.fileItem}>
              <View style={styles.fileInfo}>
                <Icon type={Icons.AntDesign} name={'filetext1'} size={20} />
                <Text style={styles.fileName} numberOfLines={1}>
                  {file.name}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.convertButton,
                  isUploading && styles.disabledButton,
                ]}
                onPress={() => handleConvert(file)}
                disabled={isUploading}>
                <Text style={styles.convertButtonText}>
                  {isUploading ? 'Uploading...' : 'Convert'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginVertical: verticalScale(10),
  },
  uploadArea: {
    margin: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: CommonColors.WHITE,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: 4,
  },
  uploadSubText: {
    fontSize: 14,
    color: '#666',
  },
  fileListContainer: {
    padding: 16,
  },
  fileItem: {
    flexDirection: 'row',
    backgroundColor: CommonColors.WHITE,
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  fileName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 8,
  },
  convertButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  convertButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default UploadScreen;
