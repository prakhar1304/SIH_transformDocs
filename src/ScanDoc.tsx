import React, { useState } from 'react';
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
import PDFLib from '@shogobg/react-native-pdf';
import RNFS from 'react-native-fs';


const ScanDoc: React.FC = () => {
  const [scannedImages, setScannedImages] = useState<string[]>([]);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const { width } = useWindowDimensions();

  const scanDocument = async () => {
    try {
      const scanResult = await DocumentScanner.scanDocument({
        croppedImageQuality: 100,
      });

      if (scanResult.scannedImages && scanResult.scannedImages.length > 0) {
        const validImages = await Promise.all(
          scanResult.scannedImages.map(async (uri) => {
            const filePath = Platform.OS === 'android' 
              ? uri.replace('content://', 'file:///') 
              : uri;
            
            const exists = await RNFS.exists(filePath);
            return exists ? filePath : null;
          })
        );

        const filteredImages = validImages.filter((img): img is string => img !== null);
        setScannedImages(prev => [...prev, ...filteredImages]);
      }
    } catch (error) {
      console.error('Scan Error:', error);
      Alert.alert('Error', 'Failed to scan the document.');
    }
  };

  const createPDF = async () => {
    if (scannedImages.length === 0) {
      Alert.alert('Error', 'No images to create PDF');
      return;
    }

    try {
      const pdfDirectory = Platform.OS === 'android'
        ? RNFS.ExternalDirectoryPath
        : RNFS.DocumentDirectoryPath;

      const pdfFilename = `ScannedDocument_${Date.now()}.pdf`;
      const pdfPath = `${pdfDirectory}/${pdfFilename}`;

      const pages = scannedImages.map((imagePath) => {
        return PDFLib.PDFPage
          .create()
          .setMediaBox(600, 800)
          .drawImage(imagePath, Platform.select({
            ios: 'jpg',
            android: 'png',
            default: 'jpg'
          }), {
            x: 0,
            y: 0,
            width: 600,
            height: 800,
          });
      });

      await PDFLib.PDFDocument
        .create(pdfPath)
        .addPages(...pages)
        .write();

      setPdfPath(pdfPath);
      Alert.alert('Success', `PDF created with ${scannedImages.length} pages`);
    } catch (error) {
      console.error('PDF Creation Error:', error);
      Alert.alert('Error', `Failed to create PDF: ${JSON.stringify(error)}`);
    }
  };

  const clearScans = () => {
    setScannedImages([]);
    setPdfPath(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Document Scanner</Text>
      
      <ScrollView 
        style={styles.imageScrollView}
        contentContainerStyle={styles.imageContainer}
      >
        {scannedImages.map((uri, index) => (
          <Image
            key={index}
            source={{uri}}
            resizeMode="cover"
            style={[styles.image, { width: width * 0.45 }]}
          />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={scanDocument}>
          {/* <Icon name="camera-outline" size={24} color="white" /> */}
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>

        {scannedImages.length > 0 && (
          <>
            <TouchableOpacity style={styles.button} onPress={createPDF}>
              {/* <Icon name="file-pdf-box" size={24} color="white" /> */}
              <Text style={styles.buttonText}>Create PDF ({scannedImages.length})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearScans}>
              {/* <Icon name="delete-outline" size={24} color="white" /> */}
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {pdfPath && (
        <View style={styles.pdfInfo}>
          {/* <Icon name="file-check-outline" size={24} color="#4CAF50" /> */}
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

