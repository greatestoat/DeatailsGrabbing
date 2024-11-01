
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { DocumentData } from '../types';

interface DocumentPreviewProps {
  data: DocumentData;
  onRetry: () => void;
  onConfirm: () => void;
}

export default function DocumentPreview({ data, onRetry, onConfirm }: DocumentPreviewProps) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-gray-900">Document Scanned</h2>
        <p className="text-gray-600">Please verify the extracted information</p>
      </div>

      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-4">
          <label className="block text-sm font-medium text-gray-600">Name</label>
          <p className="mt-1 text-lg font-semibold text-gray-900">{data.name}</p>
        </div>

        <div className="border-b border-gray-200 pb-4">
          <label className="block text-sm font-medium text-gray-600">Document Number</label>
          <p className="mt-1 text-lg font-semibold text-gray-900">{data.documentNumber}</p>
        </div>

        <div className="pb-4">
          <label className="block text-sm font-medium text-gray-600">Expiration Date</label>
          <p className="mt-1 text-lg font-semibold text-gray-900">{data.expirationDate}</p>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={onRetry}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Retry Scan
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Confirm
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
        <AlertCircle className="w-4 h-4 mr-1" />
        <span>Make sure all information is correct before confirming</span>
      </div>
    </div>
  );
}