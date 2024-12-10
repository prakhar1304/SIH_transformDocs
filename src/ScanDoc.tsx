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
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import * as PDFLib from '@shogobg/react-native-pdf';
import RNFS from 'react-native-fs';
import storage from '@react-native-firebase/storage';

const ScanDoc: React.FC = () => {
  const [scannedImages, setScannedImages] = useState<string[]>([]);
  const [firebaseImageUrls, setFirebaseImageUrls] = useState<string[]>([]);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const {width} = useWindowDimensions();

  const scanDocument = async () => {
    try {
      console.log('Starting document scan...');
      const scanResult = await DocumentScanner.scanDocument({
        croppedImageQuality: 100,
      });

      if (scanResult.scannedImages && scanResult.scannedImages.length > 0) {
        const validImages = await Promise.all(
          scanResult.scannedImages.map(async uri => {
            const filePath =
              Platform.OS === 'android'
                ? uri.replace('content://', 'file:///')
                : uri;

            const exists = await RNFS.exists(filePath);
            return exists ? filePath : null;
          }),
        );

        const filteredImages = validImages.filter(
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

  const uploadImagesToFirebase = async (images: string[]) => {
    setUploading(true);
    try {
      const uploadPromises = images.map(async (imagePath, index) => {
        // Create a unique filename
        const filename = `document_${Date.now()}_${index}.${
          Platform.OS === 'android' ? 'png' : 'jpg'
        }`;

        // Reference to Firebase Storage
        const reference = storage().ref(`scanned_documents/${filename}`);

        // Upload file
        await reference.putFile(imagePath);

        // Get download URL
        const downloadURL = await reference.getDownloadURL();
        return downloadURL;
      });

      // Wait for all uploads to complete
      const uploadedUrls = await Promise.all(uploadPromises);

      // Update Firebase image URLs state
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

  const createPDFFromFirebaseUrls = async () => {
    if (firebaseImageUrls.length === 0) {
      Alert.alert('Error', 'No images to create PDF');
      return;
    }

    try {
      // Download images from Firebase URLs
      const downloadPromises = firebaseImageUrls.map(async url => {
        const localPath = `${RNFS.DocumentDirectoryPath}/temp_${Date.now()}.${
          Platform.OS === 'android' ? 'png' : 'jpg'
        }`;

        // Download the file
        await RNFS.downloadFile({
          fromUrl: url,
          toFile: localPath,
        }).promise;

        return localPath;
      });

      const localImagePaths = await Promise.all(downloadPromises);

      // PDF creation logic remains similar to previous implementation
      const pdfDirectory =
        Platform.OS === 'android'
          ? RNFS.ExternalDirectoryPath
          : RNFS.DocumentDirectoryPath;

      const pdfFilename = `ScannedDocument_${Date.now()}.pdf`;
      const pdfPath = `${pdfDirectory}/${pdfFilename}`;

      // Create a new PDF document
      const pdfDocument = await PDFLib.PDFDocument.create(pdfPath);

      // Add pages to the PDF
      for (const imagePath of localImagePaths) {
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
            },
          );

        pdfDocument.addPages(page);
      }

      // Write the PDF
      await pdfDocument.write();

      setPdfPath(pdfPath);
      Alert.alert(
        'Success',
        `PDF created with ${localImagePaths.length} pages`,
      );
      console.log('PDF saved at:', pdfPath);

      // Optional: Clean up temporary downloaded files
      await Promise.all(localImagePaths.map(path => RNFS.unlink(path)));
    } catch (error) {
      console.error('PDF Creation Error:', error);
      Alert.alert('Error', `Failed to create PDF: ${JSON.stringify(error)}`);
    }
  };

  const clearScans = () => {
    setScannedImages([]);
    setFirebaseImageUrls([]);
    setPdfPath(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Document Scanner</Text>

      <ScrollView
        style={styles.imageScrollView}
        contentContainerStyle={styles.imageContainer}>
        {scannedImages.map((uri, index) => (
          <Image
            key={index}
            source={{uri}}
            resizeMode="cover"
            style={[styles.image, {width: width * 0.45}]}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={scanDocument}
          disabled={uploading}>
          <Text style={styles.buttonText}>
            {uploading ? 'Uploading...' : 'Scan'}
          </Text>
        </TouchableOpacity>

        {firebaseImageUrls.length > 0 && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={createPDFFromFirebaseUrls}>
              <Text style={styles.buttonText}>
                Create PDF ({firebaseImageUrls.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={clearScans}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {pdfPath && (
        <View style={styles.pdfInfo}>
          <Text style={styles.pdfText}>PDF Created Successfully</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  imageScrollView: {
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    minWidth: 120,
  },
  clearButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  pdfInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  pdfText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4CAF50',
  },
});

export default ScanDoc;
