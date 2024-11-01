import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, RefreshCcw } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { saveDocument } from '../services/api';
import type { DocumentType, DocumentData } from '../types';

interface ScannerProps {
  onScanComplete: (data: DocumentData) => void;
  documentType: DocumentType;
}

export default function Scanner({ onScanComplete, documentType }: ScannerProps) {
  const webcamRef = useRef<Webcam>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;

    setIsProcessing(true);
    setError(null);

    try {
      const worker = await createWorker();
      
      // Configure Tesseract for better accuracy
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      await worker.setParameters({
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/',
        preserve_interword_spaces: '1',
      });

      const { data: { text } } = await worker.recognize(imageSrc);
      await worker.terminate();

      console.log('Extracted text:', text); // For debugging

      const extractedData = parseDocumentText(text, documentType);
      
      if (extractedData) {
        await saveDocument({
          ...extractedData,
          documentType,
        });
        onScanComplete(extractedData);
      } else {
        setError('Could not extract required information. Please try again and ensure the document is well-lit and clearly visible.');
      }
    } catch (err) {
      setError('An error occurred while processing the image. Please try again.');
      console.error('Scanning error:', err);
    } finally {
      setIsProcessing(false);
    }
  }, [documentType, onScanComplete]);

  const parseDocumentText = (text: string, type: DocumentType): DocumentData | null => {
    // Normalize text: remove extra spaces and convert to uppercase
    const normalizedText = text.toUpperCase().replace(/\s+/g, ' ');
    const lines = normalizedText.split('\n').map(line => line.trim()).filter(Boolean);
    
    if (type === 'passport') {
      // Enhanced passport patterns
      const namePattern = /^[A-Z][A-Z\s]{2,}$/;
      const passportNumberPattern = /^[A-Z]?\d{8,9}$/;
      const datePattern = /\d{2}[\/-]\d{2}[\/-]\d{4}/;

      const name = lines.find(line => namePattern.test(line));
      const passportNumber = lines.find(line => passportNumberPattern.test(line));
      const expirationDate = lines.find(line => datePattern.test(line));

      if (name && passportNumber && expirationDate) {
        const date = expirationDate.match(datePattern)?.[0].replace(/-/g, '/');
        return {
          name: name.trim(),
          documentNumber: passportNumber.trim(),
          expirationDate: date || '',
        };
      }
    } else {
      // Enhanced driver's license patterns
      const namePattern = /^[A-Z][A-Z\s]{2,}$/;
      const licenseNumberPattern = /^[A-Z0-9]{6,8}$/;
      const datePattern = /\d{2}[\/-]\d{2}[\/-]\d{4}/;

      const name = lines.find(line => namePattern.test(line));
      const licenseNumber = lines.find(line => licenseNumberPattern.test(line));
      const expirationDate = lines.find(line => datePattern.test(line));

      if (name && licenseNumber && expirationDate) {
        const date = expirationDate.match(datePattern)?.[0].replace(/-/g, '/');
        return {
          name: name.trim(),
          documentNumber: licenseNumber.trim(),
          expirationDate: date || '',
        };
      }
    }

    return null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative rounded-lg overflow-hidden shadow-lg bg-white">
        {/* Document outline guide */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="w-full h-full border-2 border-dashed border-blue-500/50 m-4">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500"></div>
          </div>
        </div>

        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-auto"
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: "environment",
            aspectRatio: 1.6
          }}
          onUserMediaError={() => setCameraError('Camera access was denied. Please allow camera access in your browser settings.')}
        />
        
        {cameraError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {cameraError}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-white text-center text-sm px-4 py-2 bg-black/30 rounded-lg">
              Align {documentType} within the frame
            </div>
            <button
              onClick={capture}
              disabled={isProcessing || cameraError !== null}
              className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium flex items-center space-x-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCcw className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  <span>Capture {documentType}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="mt-4 space-y-2 text-center text-sm text-gray-600">
        <p>Tips for better scanning:</p>
        <ul className="list-disc text-left max-w-md mx-auto pl-4">
          <li>Ensure good lighting and avoid glare</li>
          <li>Hold the camera steady</li>
          <li>Place the entire document within the guide frame</li>
          <li>Make sure text is clear and readable</li>
        </ul>
      </div>
    </div>
  );
}