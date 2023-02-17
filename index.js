const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/process-csv', (req, res) => {

    const processed = [];
    const unprocessed = [];

    fs.createReadStream(req.body.csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          
            if (processed.some(user => user.mobile === row.mobile)) {
                unprocessed.push(row);
            } else {
                processed.push(row);
            }
        })
        .on('end', () => {
            res.json({ processed, unprocessed });
        });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
