export interface DocumentData {
    name: string;
    documentNumber: string;
    expirationDate: string;
  }
  
  export type DocumentType = 'passport' | 'license';
  
  export interface ExtractedData {
    confidence: number;
    text: string;
  }