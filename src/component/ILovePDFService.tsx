import axios from 'axios';
import RNFS from 'react-native-fs';

interface ILovePDFResponse {
  server_filename?: string;
  download_filename?: string;
  pdf_preview?: string;
  filesize?: number;
  download_url?: string;
}

class ILovePDFService {
  private publicKey: string;
  private secretKey: string;
  private baseUrl: string = 'https://api.ilovepdf.com/v1';

  constructor() {
    this.publicKey =
      'project_public_b33e2f66ccebc24056033d19e8933eeb_IK3d963f7e5fd67cf903d4b6cf51296c77be4';
    this.secretKey =
      'secret_key_50eba47b2fe1d690cc4779c04022c829_vhfd6c6683f8286f14fe436fa89d21290bd06';
  }

  // Validate image paths before processing
  private async validateImagePaths(imagePaths: string[]): Promise<string[]> {
    const validPaths = await Promise.all(
      imagePaths.map(async path => {
        // Check if file exists and is an image
        const exists = await RNFS.exists(path);
        if (!exists) {
          console.warn(`Image path does not exist: ${path}`);
          return null;
        }

        // Optional: Add more specific image type checks if needed
        const lowercasePath = path.toLowerCase();
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const isValidImage = validExtensions.some(ext =>
          lowercasePath.endsWith(ext),
        );

        return isValidImage ? path : null;
      }),
    );

    const filteredPaths = validPaths.filter(
      (path): path is string => path !== null,
    );

    if (filteredPaths.length === 0) {
      throw new Error('No valid image paths provided');
    }

    return filteredPaths;
  }

  // Start a new task with improved error handling
  private async startTask(taskType: string): Promise<string> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/start/${taskType}`,
        {public_key: this.publicKey},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10-second timeout
        },
      );

      if (!response.data || !response.data.task) {
        throw new Error('Invalid response from iLovePDF API');
      }

      return response.data.task;
    } catch (error) {
      console.error('Start Task Error:', error);
      throw new Error(`Failed to start task: ${error.message}`);
    }
  }

  // Upload files to iLovePDF with improved error handling
  private async uploadFile(task: string, filePath: string): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('task', task);
      formData.append('file', {
        uri: filePath,
        type: filePath.toLowerCase().endsWith('.png')
          ? 'image/png'
          : 'image/jpeg',
        name: `image_${Date.now()}${
          filePath.toLowerCase().endsWith('.png') ? '.png' : '.jpg'
        }`,
      });

      const response = await axios.post(`${this.baseUrl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30-second timeout for upload
      });

      if (!response.data || !response.data.server_filename) {
        throw new Error('Failed to upload file to iLovePDF');
      }

      return response.data.server_filename;
    } catch (error) {
      console.error('Upload File Error:', error);
      throw new Error(`File upload failed: ${error.message}`);
    }
  }

  // Process uploaded files with improved error handling
  private async processTask(
    task: string,
    serverFiles: string[],
  ): Promise<ILovePDFResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/process`,
        {
          task,
          files: serverFiles.map(filename => ({server_filename: filename})),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.secretKey}`,
          },
          timeout: 30000, // 30-second timeout
        },
      );

      if (!response.data || !response.data.download_url) {
        throw new Error('Invalid process response from iLovePDF API');
      }

      return response.data;
    } catch (error) {
      console.error('Process Task Error:', error);
      throw new Error(`Process task failed: ${error.message}`);
    }
  }

  // Download the processed PDF with improved error handling
  private async downloadFile(
    task: string,
    downloadUrl: string,
  ): Promise<string> {
    try {
      const response = await axios.get(downloadUrl, {
        responseType: 'arraybuffer',
        headers: {
          task: task,
          Authorization: `Bearer ${this.secretKey}`,
        },
        timeout: 60000, // 60-second timeout for download
      });

      if (!response.data) {
        throw new Error('Failed to download PDF file');
      }

      // Save the file
      const filename = `ILovePDF_${Date.now()}.pdf`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${filename}`;

      await RNFS.writeFile(filePath, response.data, 'base64');

      // Verify file was created
      const exists = await RNFS.exists(filePath);
      if (!exists) {
        throw new Error('Failed to save PDF file');
      }

      return filePath;
    } catch (error) {
      console.error('Download File Error:', error);
      throw new Error(`PDF download failed: ${error.message}`);
    }
  }

  // Main method to convert images to PDF with improved validation
  async convertImagesToPDF(imagePaths: string[]): Promise<string> {
    try {
      if (!imagePaths || imagePaths.length === 0) {
        throw new Error('No image paths provided');
      }

      // Validate image paths first
      const validImagePaths = await this.validateImagePaths(imagePaths);

      // Start image to PDF task
      const task = await this.startTask('imagepdf');

      // Upload all images
      const serverFiles = await Promise.all(
        validImagePaths.map(imagePath => this.uploadFile(task, imagePath)),
      );

      // Process the task
      const processResult = await this.processTask(task, serverFiles);

      // Download the PDF
      if (processResult.download_url) {
        const pdfPath = await this.downloadFile(
          task,
          processResult.download_url,
        );
        return pdfPath;
      }

      throw new Error('No download URL found');
    } catch (error) {
      console.error('Convert Images to PDF Error:', error);
      throw error;
    }
  }

  // Alias method to match previous implementation
  async imagesToPDF(imagePaths: string[]): Promise<string> {
    return this.convertImagesToPDF(imagePaths);
  }
}

export default ILovePDFService;
