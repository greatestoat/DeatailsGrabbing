// server.js
const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');

const app = express();
const upload = multer({ dest: 'uploads/' });
const documentRoutes = require('./documentRoutes');

app.use('/api/documents', documentRoutes);

app.post('/upload', upload.single('document'), (req, res) => {
    Tesseract.recognize(
        req.file.path,
        'eng',
        {
            logger: info => console.log(info)
        }
    ).then(({ data: { text } }) => {
        // Extract name, document number, and expiration date using regex or string manipulation
        const name = extractName(text);
        const documentNumber = extractDocumentNumber(text);
        const expirationDate = extractExpirationDate(text);
        
        res.json({ name, documentNumber, expirationDate });
    });
});

function extractName(text) {
    // Implement your extraction logic here
}

function extractDocumentNumber(text) {
    // Implement your extraction logic here
}

function extractExpirationDate(text) {
    // Implement your extraction logic here
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
