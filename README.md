# DetailsGrabbing-project-through-typescript-and-javascript
Screenshot-1
![Project](https://github.com/user-attachments/assets/3d088fef-fbdd-4696-a8c6-45f3fe6bbcae)

Screenshot-2(Input)

![project2](https://github.com/user-attachments/assets/eeb5d1e4-3f59-44e1-93eb-654bc5cde960)





Screenshot-3(Output)

![project3](https://github.com/user-attachments/assets/c3b151e9-1ca9-42a1-9743-090d61a785b3)

# Document Scanner Project

## Overview
This project is a document scanning application that utilizes a webcam to capture images of documents (like passports and licenses) and extracts relevant information using Optical Character Recognition (OCR) via the Tesseract.js library. The extracted data is then processed and can be sent to a backend for storage.

## Features
- Capture images from the webcam.
- Optical Character Recognition (OCR) to extract text from captured images.
- Support for various document types (e.g., passports, licenses).
- User-friendly interface for document scanning.

## Technologies Used
- **Frontend**: 
  - React.js
  - TypeScript
  - Tesseract.js
  - Lucide-react (for icons)
  - Tailwind CSS (for styling)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (or any database you use for storage)
  - Axios (for API calls)

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (version X.X.X)
- npm or yarn
- A MongoDB instance or a local database set up

Running the Project
Start the backend server:
cd backend
node server.js
Start the frontend application:

cd frontend
npm start
Open your web browser and navigate to http://localhost:3000 to access the application.


Here's a sample README file for your card scanning project. You can modify it based on your specific implementation details, installation instructions, or any additional features you may have.

markdown
Copy code
# Document Scanner Project

## Overview
This project is a document scanning application that utilizes a webcam to capture images of documents (like passports and licenses) and extracts relevant information using Optical Character Recognition (OCR) via the Tesseract.js library. The extracted data is then processed and can be sent to a backend for storage.

## Features
- Capture images from the webcam.
- Optical Character Recognition (OCR) to extract text from captured images.
- Support for various document types (e.g., passports, licenses).
- User-friendly interface for document scanning.

## Technologies Used
- **Frontend**: 
  - React.js
  - TypeScript
  - Tesseract.js
  - Lucide-react (for icons)
  - Tailwind CSS (for styling)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (or any database you use for storage)
  - Axios (for API calls)

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Node.js (version X.X.X)
- npm or yarn
- A MongoDB instance or a local database set up

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/document-scanner.git
   cd document-scanner
Install dependencies for both the frontend and backend:

bash
Copy code
# For frontend
cd frontend
npm install

# For backend
cd ../backend
npm install
Create a .env file in the backend directory and add your environment variables (e.g., database connection string).

Running the Project
Start the backend server:

bash
Copy code
cd backend
node server.js
Start the frontend application:

bash
Copy code
cd frontend
npm start
Open your web browser and navigate to http://localhost:3000 to access the application.

Usage
Position the document in front of the webcam.
Click the "Capture" button to take a photo of the document.
The application will process the image and extract the relevant information (name, document number, expiration date).
If extraction is successful, the data will be sent to the backend.
Error Handling
If the application fails to extract information, ensure that:

The document is clear and well-lit.
The document format matches the expected patterns defined in the code.
Contributing
Contributions are welcome! Please feel free to submit issues, fork the repository, and create pull requests.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Tesseract.js - for OCR capabilities.
React - for building the user interface.
Node.js and Express.js - for the backend server.




