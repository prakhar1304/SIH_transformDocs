import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Platform,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import * as PDFLib from '@shogobg/react-native-pdf';
import RNFS from 'react-native-fs';
import CommonStyles from '../common/CommonStyles';

const ImageToPDFConverter: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const {width} = useWindowDimensions();
  const commonStyles = CommonStyles('white');

  const pickImages = () => {
    const options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 0, // Allow multiple image selection
      includeBase64: false,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', response.errorMessage);
        return;
      }

      // Process selected images
      const pickedImages = response.assets?.map(asset => asset.uri) || [];
      setSelectedImages(prev => [...prev, ...pickedImages]);
    });
  };

  const createPDF = async () => {
    if (selectedImages.length === 0) {
      Alert.alert('Error', 'No images selected');
      return;
    }

    try {
      console.log('Starting PDF creation...');
      const pdfDirectory =
        Platform.OS === 'android'
          ? RNFS.ExternalDirectoryPath
          : RNFS.DocumentDirectoryPath;

      const pdfFilename = `SelectedImages_${Date.now()}.pdf`;
      const pdfPath = `${pdfDirectory}/${pdfFilename}`;

      console.log('PDF path:', pdfPath);

      // Create a new PDF document
      const pdfDocument = await PDFLib.PDFDocument.create(pdfPath);

      // Add pages to the PDF
      for (const imagePath of selectedImages) {
        console.log('Adding image to PDF:', imagePath);

        // Convert content:// to file:/// for Android
        const filePath =
          Platform.OS === 'android'
            ? imagePath.replace('content://', 'file:///')
            : imagePath;

        const page = PDFLib.PDFPage.create()
          .setMediaBox(600, 800)
          .drawImage(
            filePath,
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
      console.log('PDF creation successful:', pdfPath);

      setPdfPath(pdfPath);
      Alert.alert(
        'Success',
        `PDF created with ${selectedImages.length} page(s) at ${pdfPath}`,
      );
    } catch (error) {
      console.error('PDF Creation Error:', error);
      Alert.alert('Error', `Failed to create PDF: ${JSON.stringify(error)}`);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setSelectedImages(prev =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const clearAll = () => {
    setSelectedImages([]);
    setPdfPath(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Image to PDF Converter</Text>

      <ScrollView
        style={styles.imageScrollView}
        contentContainerStyle={styles.imageContainer}>
        {selectedImages.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image
              source={{uri}}
              resizeMode="cover"
              style={[styles.image, {width: width * 0.45}]}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}>
              <Text style={styles.removeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImages}>
          <Text style={styles.buttonText}>Pick Images</Text>
        </TouchableOpacity>

        {selectedImages.length > 0 && (
          <>
            <TouchableOpacity style={styles.button} onPress={createPDF}>
              <Text style={styles.buttonText}>
                Create PDF ({selectedImages.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.clearButton]}
              onPress={clearAll}>
              <Text style={styles.buttonText}>Clear All</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {pdfPath && (
        <View style={styles.pdfInfo}>
          <Text style={styles.pdfText}>PDF Created: {pdfPath}</Text>
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
  imageWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  image: {
    height: 200,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,0,0,0.7)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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

export default ImageToPDFConverter;
