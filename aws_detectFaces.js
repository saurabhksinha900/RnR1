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
      Bucket: 'bucket', // Replace with your bucket name
      Name: 'input.jpg' // Replace with your image file name
    }
  },
  Attributes: ['ALL'] // Specify which attributes you want to be returned
};

rekognition.detectFaces(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    console.log(data); // successful response
    // data.FaceDetails contains an array of face details
    // Each face detail has a BoundingBox, Confidence, Landmarks, Pose, Quality, and Attributes
  }
});
