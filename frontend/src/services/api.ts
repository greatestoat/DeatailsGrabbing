const API_URL = 'http://localhost:3000/api';

export async function saveDocument(documentData: {
  name: string;
  documentNumber: string;
  expirationDate: string;
  documentType: 'passport' | 'license';
}) {
  const response = await fetch(`${API_URL}/documents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(documentData),
  });

  if (!response.ok) {
    throw new Error('Failed to save document');
  }

  return response.json();
}

export async function getDocument(id: string) {
  const response = await fetch(`${API_URL}/documents/${id}`);

  if (!response.ok) {
    throw new Error('Failed to retrieve document');
  }

  return response.json();
}

export async function getAllDocuments() {
  const response = await fetch(`${API_URL}/documents`);

  if (!response.ok) {
    throw new Error('Failed to retrieve documents');
  }

  return response.json();
}