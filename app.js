const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { DOMParser } = require('xmldom');
const { getInvoiceInformation } = require('./utils/function');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World");
})

// Set up multer to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint for handling file upload
app.post('/render', upload.single('invoice'), (req, res) => {
    // Access the uploaded file
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // Read the XML content from the file
    const xmlString = require('fs').readFileSync(file.path, 'utf-8');
    const xmlDocument = new DOMParser().parseFromString(xmlString, 'text/xml');

    // Call your function with the XML document
    const result = getInvoiceInformation(xmlDocument);

    // Send the result back to the client
    res.send(result);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});