const { extractName, extractDocumentNumber, extractExpirationDate } = require('../extractor');

test('should extract name correctly', () => {
    const text = "John Doe, Document Number: 123456, Expiration Date: 12/25";
    expect(extractName(text)).toBe("John Doe");
});

