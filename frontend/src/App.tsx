import React, { useState } from 'react';
import { ScanLine, FileText } from 'lucide-react';
import Scanner from './components/Scanner';
import DocumentPreview from './components/DocumentPreview';
import type { DocumentType, DocumentData } from './types';

function App() {
  const [step, setStep] = useState<'select' | 'scan' | 'preview'>('select');
  const [documentType, setDocumentType] = useState<DocumentType | null>(null);
  const [scannedData, setScannedData] = useState<DocumentData | null>(null);

  const handleDocumentSelect = (type: DocumentType) => {
    setDocumentType(type);
    setStep('scan');
  };

  const handleScanComplete = (data: DocumentData) => {
    setScannedData(data);
    setStep('preview');
  };

  const handleRetry = () => {
    setStep('scan');
    setScannedData(null);
  };

  const handleConfirm = () => {
    // Here you would typically send the data to your backend
    console.log('Confirmed data:', scannedData);
    // Reset the flow
    setStep('select');
    setDocumentType(null);
    setScannedData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <ScanLine className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Document Scanner</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {step === 'select' && (
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Select Document Type</h2>
              <p className="mt-2 text-gray-600">Choose the type of document you want to scan</p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <button
                onClick={() => handleDocumentSelect('passport')}
                className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Passport</h3>
                  <p className="mt-1 text-sm text-gray-500">Scan your passport for verification</p>
                </div>
              </button>

              <button
                onClick={() => handleDocumentSelect('license')}
                className="relative group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Driver's License</h3>
                  <p className="mt-1 text-sm text-gray-500">Scan your driver's license for verification</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {step === 'scan' && documentType && (
          <Scanner
            documentType={documentType}
            onScanComplete={handleScanComplete}
          />
        )}

        {step === 'preview' && scannedData && (
          <DocumentPreview
            data={scannedData}
            onRetry={handleRetry}
            onConfirm={handleConfirm}
          />
        )}
      </main>
    </div>
  );
}

export default App;