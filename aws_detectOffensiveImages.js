// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');
var rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

/* This operation detects faces in an image stored in an AWS S3 bucket. */
var params = {
  Image: {
    S3Object: {
      Bucket: 'rsv-genexus', // Replace with your bucket name
      Name: 'genexus1.jpeg' // Replace with your image file name
    }
  },
  MinConfidence: 60 // Adjust this value according to your needs
};

rekognition.detectModerationLabels(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log(data); // successful response
    // data.ModerationLabels contains an array of moderation labels
    // Each label has a Name, Confidence, and ParentName
  }
});
