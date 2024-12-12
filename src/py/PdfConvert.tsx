import React, {useState} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import RNFS from 'react-native-fs';
import axios from 'axios';

interface PDFFile {
  name: string;
  uri: string;
  type: string;
}

interface ConversionResponse {
  content?: string;
  message?: string;
  error?: string;
}

const PdfConvert = () => {
  const [hasPermission, setHasPermission] = useState(true);
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleConvert = async (file: PDFFile, format: string) => {
    try {
      setIsLoading(true);

      // Create form data
      const formData = new FormData();
      formData.append('pdf', {
        uri: file.uri,
        type: 'application/pdf',
        name: file.name,
      });
      formData.append('format', format);

      // Send to Python backend
      const response = await axios.post<ConversionResponse>(
        'http://172.21.7.105:5000/convert',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      Alert.alert('Success', response.data.message || 'Conversion successful');
    } catch (error) {
      Alert.alert('Error', 'Failed to convert PDF');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#007AFF" barStyle={'light-content'} />
      <Text style={styles.title}>PDF Converter</Text>

      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.uploadArea}
          onPress={handleSelectPDF}
          disabled={isLoading}>
          <Text style={styles.uploadText}>
            {isLoading ? 'Converting...' : 'Tap to Upload PDF'}
          </Text>
          <Text style={styles.uploadSubText}>
            Select PDF files from your device
          </Text>
        </TouchableOpacity>

        <View style={styles.fileListContainer}>
          {pdfFiles.map((file, index) => (
            <View key={index} style={styles.fileItem}>
              <View style={styles.fileInfo}>
                <Text style={styles.fileName} numberOfLines={1}>
                  {file.name}
                </Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.convertButton,
                    isLoading && styles.disabledButton,
                  ]}
                  onPress={() => handleConvert(file, 'docx')}
                  disabled={isLoading}>
                  <Text style={styles.convertButtonText}>To Word</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.convertButton,
                    isLoading && styles.disabledButton,
                  ]}
                  onPress={() => handleConvert(file, 'xlsx')}
                  disabled={isLoading}>
                  <Text style={styles.convertButtonText}>To Excel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.convertButton,
                    isLoading && styles.disabledButton,
                  ]}
                  onPress={() => handleConvert(file, 'csv')}
                  disabled={isLoading}>
                  <Text style={styles.convertButtonText}>To CSV</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.convertButton,
                    isLoading && styles.disabledButton,
                  ]}
                  onPress={() => handleConvert(file, 'text')}
                  disabled={isLoading}>
                  <Text style={styles.convertButtonText}>To Text</Text>
                </TouchableOpacity>
              </View>
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
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  uploadArea: {
    margin: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
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
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  fileInfo: {
    marginBottom: 12,
  },
  fileName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  convertButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    width: '48%',
    marginBottom: 8,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  convertButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default PdfConvert;
