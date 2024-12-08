declare module 'react-native-image-to-pdf' {
    interface PDFOptions {
      imagePaths: string[];
      name?: string;
      maxSize?: {
        width: number;
        height: number;
      };
      quality?: number;
    }
  
    interface PDFResult {
      filePath: string;
    }
  
    function createPDFbyImages(options: PDFOptions): Promise<PDFResult>;
  
    export { createPDFbyImages };
  }
  