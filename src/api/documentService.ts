// src/services/documentService.ts

import { UploadResponse, UploadRequest } from '../types/api';

const API_URL = 'https://e2bb-125-18-25-132.ngrok-free.app/api';

class DocumentService {
  static async uploadDocument(
    fileContent: string,
    fileName: string,
    fileType: string = 'application/pdf'
  ): Promise<UploadResponse> {
    try {
      const requestData: UploadRequest = {
        fileName,
        fileType,
        fileContent,
      };

      const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed: ${response.status} ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }
}

export default DocumentService;