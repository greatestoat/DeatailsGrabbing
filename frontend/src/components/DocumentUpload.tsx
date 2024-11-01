// src/components/DocumentUpload.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { DocumentData } from '../types';

interface DocumentUploadProps {
    onUploadComplete: (data: DocumentData) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUploadComplete }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return; // Check if a file is selected

        const formData = new FormData();
        formData.append('document', file);

        try {
            const response = await axios.post<DocumentData>('/api/documents/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const extractedData: DocumentData = response.data; // Use the response data as DocumentData type
            onUploadComplete(extractedData); // Call the parent function with extracted data
        } catch (error) {
            console.error('Error uploading document:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Document</button>
        </div>
    );
};

export default DocumentUpload;
