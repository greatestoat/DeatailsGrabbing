const Tesseract = require('tesseract.js');
const { extractName, extractDocumentNumber, extractExpirationDate } = require('./extractor');

exports.uploadDocument = (req, res) => {
    Tesseract.recognize(
        req.file.path,
        'eng',
        {
            logger: info => console.log(info)
        }
    ).then(({ data: { text } }) => {
        const name = extractName(text);
        const documentNumber = extractDocumentNumber(text);
        const expirationDate = extractExpirationDate(text);
        res.json({ name, documentNumber, expirationDate });
    });
};
