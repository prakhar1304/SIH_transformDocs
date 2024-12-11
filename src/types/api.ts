// src/types/api.ts

export interface UploadResponse {
    data: {
      url: string;
      key: string;
      fileName: string;
      fileType: string;
      isMachineReadable: boolean;
      needsConversion: boolean;
    };
  }
  
  export interface UploadRequest {
    fileName: string;
    fileType: string;
    fileContent: string;
  }