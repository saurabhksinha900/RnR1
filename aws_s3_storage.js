const AWS = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const s3 = new AWS.S3({
  region: 'your-region',
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
});

app.post('/upload', (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
      return;
    }

    const file = files.file;
    const fileName = file.name;
    const filePath = file.path;
    const fileStream = fs.createReadStream(filePath);

    const uploadParams = {
      Bucket: 'your-bucket-name',
      Key: fileName,
      Body: fileStream,
    };

    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
        return;
      }

      console.log(`File uploaded successfully. ${data.Location}`);
      res.send(`File uploaded successfully. ${data.Location}`);
    });
  });
});
