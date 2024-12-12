import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  useWindowDimensions,
  TextInput,
  StatusBar,
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import * as PDFLib from '@shogobg/react-native-pdf';
import RNFS from 'react-native-fs';
import storage from '@react-native-firebase/storage';
import CommonColors from '../common/CommonColors';
import Header from '../component/header/Index';
import LinearGradient from 'react-native-linear-gradient';
import Icon, {Icons} from '../common/Icons';
import {verticalScale} from 'react-native-size-matters';
import style from './Scan/Style';
import {useAuth} from '../context/AuthContext';

const API_URL: string = 'https://d642-125-18-25-132.ngrok-free.app/api/upload';

interface ScanDocumentResult {
  scannedImages: string[];
}

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

interface UploadRequestBody {
  fileName: string;
  fileType: string;
  fileContent: string;
}

const ScanDoc: React.FC = () => {
  const {token} = useAuth();
  const [scannedImages, setScannedImages] = useState<string[]>([]);
  const [firebaseImageUrls, setFirebaseImageUrls] = useState<string[]>([]);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const {width} = useWindowDimensions();
  const [fileName, setFileName] = useState<string>('');
  const [pdfBase64, setPdfBase64] = useState<string>('');
  const [fileNameInputMode, setFileNameInputMode] = useState<boolean>(false);

  const styles = style;

  const convertToBase64 = async (pdfPath: string): Promise<string> => {
    try {
      // Read the file content
      const fileContent: string = await RNFS.readFile(pdfPath, 'base64');
      return `data:application/pdf;base64,${fileContent}`;
    } catch (error) {
      console.error('Error converting file to base64:', error);
      throw error;
    }
  };

  const scanDocument = async (): Promise<void> => {
    try {
      const scanResult = await DocumentScanner.scanDocument({
        croppedImageQuality: 50,
      });

      if (scanResult.scannedImages && scanResult.scannedImages.length > 0) {
        const validImages: (string | null)[] = await Promise.all(
          scanResult.scannedImages.map(async (uri: string) => {
            const filePath: string =
              Platform.OS === 'android'
                ? uri.replace('content://', 'file:///')
                : uri;

            const exists: boolean = await RNFS.exists(filePath);
            return exists ? filePath : null;
          }),
        );

        const filteredImages: string[] = validImages.filter(
          (img): img is string => img !== null,
        );

        setScannedImages(prev => [...prev, ...filteredImages]);
        uploadImagesToFirebase(filteredImages);
      } else {
        console.log('No images found in scan result.');
      }
    } catch (error) {
      console.error('Scan Error:', error);
      Alert.alert('Error', 'Failed to scan the document.');
    }
  };

  const uploadImagesToFirebase = async (images: string[]): Promise<void> => {
    setUploading(true);
    try {
      const uploadPromises: Promise<string>[] = images.map(
        async (imagePath, index) => {
          const filename: string = `document_${Date.now()}_${index}.${
            Platform.OS === 'android' ? 'png' : 'jpg'
          }`;

          const reference = storage().ref(`scanned_documents/${filename}`);
          await reference.putFile(imagePath);
          const downloadURL: string = await reference.getDownloadURL();
          return downloadURL;
        },
      );

      const uploadedUrls: string[] = await Promise.all(uploadPromises);
      setFirebaseImageUrls(prev => [...prev, ...uploadedUrls]);

      Alert.alert(
        'Success',
        `${uploadedUrls.length} images uploaded to Firebase`,
      );
    } catch (error) {
      console.error('Firebase Upload Error:', error);
      Alert.alert('Error', 'Failed to upload images to Firebase');
    } finally {
      setUploading(false);
    }
  };

  const createPDF = async (): Promise<void> => {
    if (firebaseImageUrls.length === 0) {
      Alert.alert('Error', 'No images to create PDF');
      return;
    }

    if (!fileName.trim()) {
      Alert.alert('Error', 'Please enter a file name');
      return;
    }

    try {
      // Download images from Firebase URLs
      const downloadPromises: Promise<string>[] = firebaseImageUrls.map(
        async (url, index) => {
          const localPath: string = `${
            RNFS.DocumentDirectoryPath
          }/temp_${Date.now()}_${index}.${
            Platform.OS === 'android' ? 'png' : 'jpg'
          }`;

          await RNFS.downloadFile({
            fromUrl: url,
            toFile: localPath,
          }).promise;

          return localPath;
        },
      );

      const localImagePaths: string[] = await Promise.all(downloadPromises);

      // Determine PDF storage path
      const pdfDirectory: string =
        Platform.OS === 'android'
          ? RNFS.ExternalDirectoryPath
          : RNFS.DocumentDirectoryPath;

      const pdfFilename: string = `${fileName.trim()}_${Date.now()}.pdf`;
      const pdfPath: string = `${pdfDirectory}/${pdfFilename}`;

      // Create a new PDF document
      const pdfDocument = await PDFLib.PDFDocument.create(pdfPath);

      // Add pages to the PDF
      for (const [index, imagePath] of localImagePaths.entries()) {
        const page = PDFLib.PDFPage.create()
          .setMediaBox(600, 800)
          .drawImage(
            imagePath,
            Platform.select({
              ios: 'jpg',
              android: 'png',
              default: 'jpg',
            }),
            {
              x: 0,
              y: 0,
              width: 600,
              height: 800,
              compressionQuality: 0.5,
            },
          );

        pdfDocument.addPages(page);
      }

      // Write the PDF
      await pdfDocument.write();

      const fileContent: string = await convertToBase64(pdfPath);
      setPdfBase64(fileContent);
      setPdfPath(pdfPath);
      console.log('File converted to base64, size:', fileContent.length);

      // Clean up temporary downloaded files
      await Promise.all(localImagePaths.map(path => RNFS.unlink(path)));

      Alert.alert('Success', 'PDF created successfully');
    } catch (error) {
      console.error('PDF Creation Error:', error);
      Alert.alert('Error', `Failed to create PDF: ${JSON.stringify(error)}`);
    }
  };

  const uploadPDF = async (): Promise<void> => {
    if (!pdfBase64) {
      Alert.alert('Error', 'No PDF to upload');
      return;
    }

    try {
      setUploading(true);

      const requestBody: UploadRequestBody = {
        fileName: `${fileName.trim()}`,
        fileType: 'application/pdf',
        fileContent: pdfBase64,
      };

      const response: Response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText: string = await response.text();
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }

      const result: UploadResponse = await response.json();
      Alert.alert('Success', 'PDF uploaded to AI service successfully');
      console.log('AI Upload Response:', result);
    } catch (error) {
      console.error('AI Upload Error:', error);
      Alert.alert('Error', 'Failed to upload PDF to AI service');
    } finally {
      setUploading(false);
    }
  };

  const clearScans = (): void => {
    setScannedImages([]);
    setFirebaseImageUrls([]);
    setPdfPath(null);
    setPdfBase64('');
    setFileName('');
  };

  const toggleFileNameInput = (): void => {
    setFileNameInputMode(!fileNameInputMode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={CommonColors.GRADIENT_ONE}
        barStyle="light-content"
      />
      <Header title={'Document Scanner'} />

      <View style={styles.contentContainer}>
        {fileNameInputMode ? (
          <View style={styles.fileNameInputContainer}>
            <TextInput
              style={styles.fileNameInput}
              placeholder="Enter file name"
              value={fileName}
              onChangeText={setFileName}
              placeholderTextColor={CommonColors.BG_LIGHT_GRAY}
            />
            <TouchableOpacity
              style={styles.doneButton}
              onPress={toggleFileNameInput}
              disabled={!fileName.trim()}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.fileNameDisplay}
            onPress={toggleFileNameInput}>
            <Icon
              type={Icons.Feather}
              name={'edit-2'}
              size={18}
              color={CommonColors.THEME}
            />
            <Text style={styles.fileNameText}>
              {fileName || 'Tap to set file name'}
            </Text>
          </TouchableOpacity>
        )}

        <ScrollView
          style={styles.imageScrollView}
          contentContainerStyle={styles.imageContainer}>
          {scannedImages.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image
                source={{uri}}
                resizeMode="cover"
                style={[styles.image, {width: width * 0.45}]}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.imageOverlay}>
                <Text style={styles.imageNumber}>Page {index + 1}</Text>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.uploadArea, uploading && styles.disabledButton]}
            onPress={scanDocument}
            disabled={uploading}>
            <Icon
              type={Icons.AntDesign}
              name={'scan1'}
              size={20}
              color={'#2196F3'}
            />
            <Text style={styles.uploadText}>
              {uploading ? 'Scanning...' : 'Scan Document'}
            </Text>
            <Text style={styles.uploadSubText}>
              Capture pages for your document
            </Text>
          </TouchableOpacity>

          {firebaseImageUrls.length > 0 && (
            <View style={styles.actionButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  uploading && styles.disabledButton,
                ]}
                onPress={createPDF}
                disabled={uploading || !fileName.trim()}>
                <Text style={styles.actionButtonText}>
                  {uploading ? 'Processing...' : 'Create PDF'}
                </Text>
              </TouchableOpacity>

              {pdfBase64 && (
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    uploading && styles.disabledButton,
                  ]}
                  onPress={uploadPDF}
                  disabled={uploading}>
                  <Text style={styles.actionButtonText}>
                    {uploading ? 'Uploading...' : 'Upload PDF'}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[
                  styles.actionButton,
                  uploading && styles.disabledButton,
                ]}
                onPress={clearScans}
                disabled={uploading}>
                <Text style={styles.actionButtonText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScanDoc;
