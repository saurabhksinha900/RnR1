let express = require('express');
let app = express();
const path = require("path");
const homedir = require("os").homedir();
const port = 3015;
let fetch = require("node-fetch");

let nearAPI = require('near-api-js');
var request = require('request').defaults({ encoding: null });

const fs = require('fs').promises;


app.get('/detectOffensiveImages', (req, res) => {
  const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient({
  credentials: {
   client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});

async function detectOffensiveImages(inputFile) {
  const [result] = await client.safeSearchDetection(inputFile);
  const detections = result.safeSearchAnnotation;

  console.log(`Adult: ${detections.adult}`);
  console.log(`Medical: ${detections.medical}`);
  console.log(`Spoof: ${detections.spoof}`);
  console.log(`Violence: ${detections.violence}`);
  console.log(`Racy: ${detections.racy}`);

    res.send("<img src='gs://cloud-samples-data/vision/label/wakeupcat.jpg'/></br>"+JSON.stringify(detections));
}

detectOffensiveImages('gs://cloud-samples-data/vision/label/wakeupcat.jpg');
  
  
});

app.get('/detectFaces', (req, res) => {
  const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});

async function detectFaces(inputFile) {
  const [result] = await client.faceDetection(inputFile);
  const faces = result.faceAnnotations;
  console.log('Faces:');
  faces.forEach(face => {
    console.log(`Joy: ${face.joyLikelihood}`);
    console.log(`Anger: ${face.angerLikelihood}`);
    console.log(`Sorrow: ${face.sorrowLikelihood}`);
    console.log(`Surprise: ${face.surpriseLikelihood}`);
  });
  res.send("<img src='https://th.bing.com/th/id/OIP.jBgDNqoKGeZTtevc98xmwQHaLH?pid=ImgDet&rs=1'/></br>"+JSON.stringify(result));
}

detectFaces('https://th.bing.com/th/id/OIP.jBgDNqoKGeZTtevc98xmwQHaLH?pid=ImgDet&rs=1');

});

app.get('/detectLabels', (req, res) => {
  const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
   credentials: {
    client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});

async function detectLabels(inputFile) {
  const [result] = await client.labelDetection(inputFile);
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
    res.send("<img src='https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/Sample.jpg'/></br>"+JSON.stringify(result));
}

detectLabels('https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/Sample.jpg');


});

app.get('/detectObjects', (req, res) => {
  const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});


async function detectObjects(inputFile) {
  const [result] = await client.objectLocalization(inputFile);
  const objects = result.localizedObjectAnnotations;
  console.log('Objects:');
  objects.forEach(object => {
    console.log(object.name);
    console.log(`Confidence: ${object.score}`);
    const vertices = object.boundingPoly.normalizedVertices;
    vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
  });
     res.send("<img src='https://th.bing.com/th/id/OIP.-rlXQZyb25WAoXAxmhvQ-wHaE7?w=273&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7'/></br>"+JSON.stringify(result));
}

detectObjects('https://th.bing.com/th/id/OIP.-rlXQZyb25WAoXAxmhvQ-wHaE7?w=273&h=182&c=7&r=0&o=5&dpr=1.5&pid=1.7');

});

app.get('/detectText', (req, res) => {
  const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
  credentials: {
   client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});

async function detectText(inputFile) {
  const [result] = await client.textDetection(inputFile);
  const detections = result.textAnnotations;
  console.log('Text:');
  detections.forEach(text => console.log(text.description));
  res.send("<img src='https://th.bing.com/th/id/R.3dd9e7260c5072ca09385f789c9832cc?rik=%2fxeX7G4YlPgHWg&pid=ImgRaw&r=0'/></br>"+JSON.stringify(result));
}

detectText('https://th.bing.com/th/id/R.3dd9e7260c5072ca09385f789c9832cc?rik=%2fxeX7G4YlPgHWg&pid=ImgRaw&r=0');
});

app.get('/analyzeVideo', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});



async function analyzeVideo(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['LABEL_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const labels = operationResult.annotationResults[0].segmentLabelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.entity.description));
  
   res.send('<video width="320" height="240" controls>  <source src="https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/hi%20(1).mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

//analyzeVideo('gs://cloud-samples-data/video/cat.mp4');

analyzeVideo('gs://gcds-oht33907u9-2023.appspot.com/hi (1).mp4');
});

app.get('/annotateVideo', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});
async function annotateVideo(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['LABEL_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const labels = operationResult.annotationResults[0].segmentLabelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.entity.description));
  res.send('<video width="320" height="240" controls>  <source src="https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/hi%20(1).mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

annotateVideo('gs://gcds-oht33907u9-2023.appspot.com/hi (1).mp4');
});

app.get('/detectVideoExplicitContent', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});



async function detectExplicitContent(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['EXPLICIT_CONTENT_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const explicitContent = operationResult.annotationResults[0].explicitAnnotation;
  console.log('Explicit content:');
  console.log(`Adult: ${explicitContent.frames.adult}`);
  console.log(`Violent: ${explicitContent.frames.violent}`);
  res.send('<video width="320" height="240" controls>  <source src="https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/hi%20(1).mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

detectExplicitContent('gs://gcds-oht33907u9-2023.appspot.com/hi (1).mp4');

});

app.get('/detectVideoFaces', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});


async function detectFaces(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['FACE_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const faces = operationResult.annotationResults[0].faceDetectionAnnotations;
  console.log('Faces:');
  faces.forEach(face => console.log(face.name));
  
    res.send('<video width="320" height="240" controls>  <source src="https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/hi%20(1).mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

detectFaces('gs://gcds-oht33907u9-2023.appspot.com/hi (1).mp4');

});

app.get('/detectVideoLogo', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});


async function detectLogo(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['LOGO_RECOGNITION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const logos = operationResult.annotationResults[0].logoRecognitionAnnotations;
  console.log('Logos:');
  logos.forEach(logo => console.log(logo.entity.description));
  res.send('<video width="320" height="240" controls>  <source src="https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/hi%20(1).mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

detectLogo('gs://gcds-oht33907u9-2023.appspot.com/hi (1).mp4');

});

app.get('/detectVideoPerson', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});


async function detectPerson(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['PERSON_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const people = operationResult.annotationResults[0].personDetectionAnnotations;
  console.log('People:');
  people.forEach(person => console.log(person.name));
  
    res.send('<video width="320" height="240" controls>  <source src="https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/hi%20(1).mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

detectPerson('gs://gcds-oht33907u9-2023.appspot.com/hi (1).mp4');

});

app.get('/detectVideoText', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});


async function detectText(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['TEXT_DETECTION'],
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const textAnnotations =
    operationResult.annotationResults[0].textAnnotations;
  console.log('Text:');
  textAnnotations.forEach(text => console.log(text.description));
  res.send('<video width="320" height="240" controls>  <source src="https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/hi%20(1).mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

//detectText('gs://cloud-samples-data/video/cat.mp4');

  detectText('gs://gcds-oht33907u9-2023.appspot.com/hi (1).mp4');

});

app.get('/detectVideoTranscribeSpeech', (req, res) => {
  const videoIntelligence = require('@google-cloud/video-intelligence');
const client = new videoIntelligence.VideoIntelligenceServiceClient({
  credentials: {
    client_email: 'gcds-oht33907u9-2023@appspot.gserviceaccount.com',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDK9aEHmSdv/N+u\nsZcByUv9TsgIh9rMeAar5WjX6C7qI2Gwm7nyaKYYZkRp1CHDpgJJVDttJL7xXce8\nL0Wf28h7s/fFMaPoAbg4qklLvi+QWXQxX/OnfFainecKSbRqizILKz67LdhoQU2p\nuAeFXynxj9dVgqTjedjgAx20U4YoL0qMXkBshuwjj9bOH/vf94fifnpzdU2j9Fds\no9/t/IGhHr2Gb6cUgDwuwZ0FpL6ui6emPsaejEEfmRF3deek8hTONK94DfF+1F7P\nV3Yk2HFmTocm3cyjnFhC7JRBZ929IuHXt+5PtoO6Uwh4x0SLa0AuUVvuE+GOJRpB\nGqz3dL0tAgMBAAECggEAErmn0joko9XqU0VKP91xF91RYkwaeTvnratcSXNABNUf\n2bn8ZWuXS3AABt2OAe2Kj3ZohzDZNw6mc2vPGikebZ9UkEp8q1ahRwUa/xR8ce52\n5GlMYxr7KUS1QMM9FIlkJBio0H8x1KiVwD9c3kbB6WoSfW6wxNYEluJitrTwDzvn\nghR0McP/qUM67w67qAh0hfs7KAGncecMQyqp9wSNf7hx3Ya+boqfTTH5IXmW6sgl\n/LujFGjeOqDnLv6mSK/LYQHJC1C+CcII+GFpkL5QUJ1qBC3pLmEsNN6/Qj/bmad5\nvAn83vdSIstUB3JjZk5kI0kwcB2lWrp8j+ut9XKfwQKBgQD5rTE2AbZ0sbh/QdrE\nS0CmusN0U4P+/QoRJx+uv52Fk+cSPwtmxF0DBNUU4awukfr3X1Y+uB6gTJKxEC8o\n3pqi7jv/uVGHdjgoSaYZsR5G+6DfzR3K+rIBPOL7ji8K1R2EQ+u07DHQQH15rWdO\n9aNuu3BiuElh5DU9Dp4Sl70EjQKBgQDQGYqOD0UtBg1F4W1jKD0BcObm6UU5arXE\niYPj4mo5iWuCS9/3WgV3SDoKNOsPvx8KYOC0xujObE5WwSsLRCsdFEYURg8bibfv\nYDppzaNilPGUkcnFfAWEg7iunEUApxIHi3gEQX3A1C+pZH7k5TzYIXgXZ9+7lAMo\neqR9tI+DIQKBgQCDYKvVZD9S1jVj2Q45XfOuB/ZTHqMFKLcEYZbdR/ymTjY3tq7U\nK51ZulA5Rappcu0g/6yNIisTZFeIDiESm1e5RiySGjyZUA6qvF5HhJiO91cmjHMR\n3KqP1i8F+UItrAh1EZxUvjhUAatEvIbw2HZgDQdNGvWaKhANicSJugh+/QKBgQCc\nFCwJdIaLyFg4K2Wh01I+PHHSiu8yq0h9ii5zwyOs19bcuQ/YM5qZ5oAxm5MaElyz\nqgmfTPjbqfvvsZ4ZKx2zB7uwBQPbwaVFUsU9CdEbZV7z8YyGJAj3ZNwlimtum+A3\n7HEtr/kjoYHF6OwLvauu5xttYqk5xT/BIosxBTYGQQKBgQCUgX7jlj1SOOPKqs5A\n1i8IASmckN1++pWMWE+oLmUwzu8lZhzsr5DxGP52GXlEXdCEif3ozm2hA6bXENyn\ndQa8UIjXJ2Qf1+oPyn9vgoFCaYb/ywIQ2yduYNPWvqDtQbZOn2GLShy/q5vSlJ9v\ndtwOI0hBstAEVJl6cAZjCH/QfA==\n-----END PRIVATE KEY-----\n',
  },
});



async function transcribeSpeech(inputFile) {
  const [operation] = await client.annotateVideo({
    inputUri: inputFile,
    features: ['SPEECH_TRANSCRIPTION'],
    videoContext: {
      speechTranscriptionConfig: {
        languageCode: 'en-US',
        enableAutomaticPunctuation: true,
      },
    },
  });

  console.log('Waiting for operation to complete...');
  const [operationResult] = await operation.promise();

  const transcription = operationResult.annotationResults[0].speechTranscriptions[0];
  console.log(`Transcription: ${transcription.transcript}`);
  res.send('<video width="320" height="240" controls>  <source src="https://storage.googleapis.com/gcds-oht33907u9-2023.appspot.com/hi%20(1).mp4" type="video/mp4">  </video></br>'+JSON.stringify(operationResult));
}

transcribeSpeech('gs://gcds-oht33907u9-2023.appspot.com/hi (1).mp4');

});

app.get('/home', (req, res) => {
  res.sendFile('index.html', { root: __dirname })
});


app.get('/chat', (req, res) => {
  res.sendFile('index1.html', { root: __dirname })
});


app.get('/bulk_store_success', (req, res) => {
  var projectId = req.query.projectId;
  var client_email = req.query.client_email;
  var private_key = req.query.private_key;
  var bucketName = req.query.bucketName;
  //console.log('projectId'+projectId);
  //console.log('client_email'+client_email);
  //console.log('private_key'+private_key);
  //console.log('bucketName'+bucketName);



  const { Storage } = require('@google-cloud/storage');

  const projectId1 = 'gcms-oht28886u9-2022';
  const client_email1 = "gcms-oht28886u9-2022@appspot.gserviceaccount.com";
  const private_key1 = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCP7gNJICgm0TIK\nz+Jzm+8j0143QH5rfdaPTpLnL0x6Zz269Jxjqup7NqI43R5vV1XuBxScPrDkuplm\nW8kOY8tGlsFCB1YdIJcJrELgp7D+Wqt/blhXN3aqwFJEdVGaF4XbUEUKNhJrhStF\nOYZplK/jVdcoeREhjBLnZtLliqaQ3v1n0I3yFMJs3x/J5mApa9gKsVNqJy3g+acD\noH0ydcSkRruQEUsZdtfPWGht2ohVeb7vSa45TlzSLp7kXQCOQBMp5Y7svVkNRQPi\naSLrFLDGtcqaC9lW/0LIMUz+oasJXjgFM8Lo8z3uyPNXnt7pgwDGRhoG8fD2TM3w\nLCkdr76LAgMBAAECggEAGocExgKOQ/FEpud/1k0EO3cmo0pYwpkT5Z/WxZNbJihH\nIWEaPehvhTwhlBd1F5JiPRfC/bU0R0P5J/t8yBEukxkQD4ponb+29spwHRXrMkYl\n27vLvm9ziK8fuoxg+OSjADQANYyXwodt3TloA6eq71yP5l7CAIvfpBS4hCQU5Rhd\nk6HnPoXFzuJZR/IpFfM/3pgDRTMa2Lpy2Zu/jvZ9ocFk1oF67jcIFtpTTNqKrrim\nWDMZzJvpcbFfDAzcGCKUjnbh1RyYSkOe/jYL2M+J8slWAEN0ujqBe0F6AJPgiSvh\nm6ci1iExjSNlvtklfI1w/pFYwvjhWxIdNetLidwfiQKBgQDF7TbBVJ4eEygPK/PW\n7UN5dU52SG9G5HGu08HkWaNdj7yqbOA4nefWoMvQ2dTs18DH49wIKZv+19HG9z9K\nEZ2XnDiEVRWckGw/Jri7P7v7acnaYxLmQYAlfQAAI0R+Y0WDnS1tjwV5GgmZ+RrA\nMEMtmGd06vL5iL/nmhbCXwW65QKBgQC6KPO6Kt5AYvPIG1ITu/MB3SwPOrgXkPHy\njFi7wmBo5c5yYHTMYUdyp+rWdNliv+zIUMPYCt7k5/hpWWWvFx+Nx3ZQC22M/s8e\nruiLzsurNEl+B+8H8gNes+7qboPfNKMgSu5aU4GlE2BRiyGgE2jH7NGVJMcdJ2j9\n0XwDFpVMrwKBgFw5WN8il355/Jt9JmRKL7uDbmjs/XSx80q7/sdxAQ8Sb52Vl7Cp\n2yIF0JJjPbSSH5DEWn0vLjHDzEqCYGoZ5S2ErEz0/Fn0bYvLdh5B50yRkW2B5oeF\nk7lkEkD+LecaSIS4EzfOgYVZHYoyKUXN9y9iqSowY8Dj+E9pXBt7fUcFAoGAMzzO\nSHFAFsyleHA8mP3kFqE/XTm2LZZRYYbLbXJEgtqthcGSpCYqOh6JfllO8+ULUN8Z\n6D6ltq86KhTW7egZYTaDE+jxUBtZ+oH9s21JlWegyrV4TuGHl+tCWPfuB+M++sZk\n8CuHxV2d5xO6P4rYDh7aWIh03UtZlHKyBU+T7DUCgYBsvWcHYuM9RVywNKboWFW1\n38SnljUpHosNGW7N0B9kkQmZ5xxkm27w9v5ezBolmu4vDg2FM/Pb7nXnpWVisJUs\nDJMVLYZ/vuQ6CCKQ0fYDNIdjuZxwy7p+srK3Sau84sydSQ7XYERrcqkiKCLO0e+7\ne8+LkI+fVT9311s+CFFkhg==\n-----END PRIVATE KEY-----\n";


  const gcs = new Storage({
    projectId: projectId1,
    scopes: 'https://www.googleapis.com/auth/cloud-platform',
    credentials: {
      client_email: client_email1,
      private_key: private_key1
    }
  });

  let bucketName1 = 'gcms-oht28886u9-2022.appspot.com';
  let bucket = gcs.bucket(bucketName1);
  bucket.getFiles({}, (err, files, apires) => {
    console.log("Total files available in Google Cloud Storage is " + files.length);
    var a;
    for (var i = 0; i < files.length; i++) {
      //console.log("Public URL");
      console.log("https://storage.googleapis.com/gcms-oht28886u9-2022.appspot.com/" + files[i].name);
      var path = "https://storage.googleapis.com/gcms-oht28886u9-2022.appspot.com/" + files[i].name;



      request.get(path, function(error, response, body) {
        ``
        if (!error && response.statusCode == 200) {
          data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
          //console.log(data);
          fs.writeFile("writeMe.txt", data);


          fetch('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjY2ODM3OGE3LWVkMjItNDk0NS04NDM1LTFhMWUyMWE0YWQ1OCIsIm9yZ0lkIjoiMjEzMDM4IiwidXNlcklkIjoiMjEyNzE4IiwidHlwZUlkIjoiMzk2NTU3ZDItZjUwNi00NDQxLTlhYmEtMmUyZjM2OTBlNTFiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODU2Mzc4MTYsImV4cCI6NDg0MTM5NzgxNn0.Nsze3pKimlizkiimp4k6jE8aDEIWmAB_AuO5UCw-wVo',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify([
              {
                'path': path,
                'content': data
              }
            ])
          }).then(res => res.json())
            .then(jsonData => {
              console.log(JSON.stringify(jsonData[0]));



            });
        }
      });

    }
    res.send("Congratulations! Your files have been uploaded from Google Cloud Storage to IPFS Blockchain Storage.");
  });
});

app.get('/bulk_mint', (req, res) => {
  res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><h2  style='color:blue;'>  Move Files from Google Cloud to IPFS</h2> <br/>          <br/><form action='https://InfyNFT.saurabhksinha90.repl.co/bulk_store_success' method='get'>  <label for='projectId'> GCP Project ID:</label>  <input type='text' id='projectId' name='projectId'><br><label for='client_email'>  Client Email:</label>  <input type='text' id='client_email' name='client_email'><br><label for='private_key'>  Private Key:</label>  <input type='text' id='private_key' name='private_key'><br><label for='bucketName'> Bucket Name:</label>  <input type='text' id='bucketName' name='bucketName'><br><br>   <input type='submit' value='Bulk Upload' style='background-color:blue; border-color:black; color:white;  width:auto;'></form>   </div>  </body></html>");

});

app.get('/send', (req, res) => {

  request.get('https://miserabletimelyquery.saurabhksinha90.repl.co/balance/saurabhksinha900.testnet', function(error, response, body) {
    ``
    if (!error && response.statusCode == 200) {
      data = parseFloat((Buffer.from(body)).toString('utf8').match(/[\d\.]+/));

      console.log(data);
      res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='https://InfyNFT.saurabhksinha90.repl.co/home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='https://infynft.saurabhksinha90.repl.co/view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><h2  style='color:blue;'>Send Asset</h2>    <form action='https://InfyNFT.saurabhksinha90.repl.co/send_success' method='get'>  <label for='asset'>Asset Name:</label>  <label for='asset_name'>NEAR</label><br><br><label for='amount'>Amount:</label>  <input type='text' id='amount' name='amount' value='19'><br><br><label for='receiver_id'>Receiver Account Address:</label>  <input type='text' id='receiver_id' name='receiver_id' value='saurabhksinha90.testnet'><br><br><label for='account'>Sender Account Address:</label>  <label for='account_value'>saurabhksinha900.testnet</label><br><br>   <label for='balance'>Wallet Balance:</label>  <label for='balance_value'>" + data + " NEAR</label><br><br>   <label for='balance'>Reserved for Storage:</label>  <label for='balance_value'>3.835 NEAR</label><br><br>   <label for='balance'>Reserved for Transactions:</label>  <label for='balance_value'>0.05 NEAR</label><br><br>   <label for='balance'>Available Balance:</label>  <label for='balance_value'>" + (data - 3.885) + " NEAR</label><br><br>   <input type='submit' value='Send' style='background-color:blue; border-color:black; color:white;  width:auto;'></form>   </div>  </body></html>");


    }
  });
});

app.get('/send_success', (req, res) => {
  var receiver_id = req.query.receiver_id;
  var amount = req.query.amount;
  var request = require('request');

  var options = {
    url: 'https://near-transfer.saurabhksinha90.repl.co/create-transaction?sender=saurabhksinha900.testnet&receiver=' + receiver_id + '&amt=' + amount
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body).actions[0].Transfer.deposit);
      res.send("<html><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='https://InfyNFT.saurabhksinha90.repl.co/home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='https://infynft.saurabhksinha90.repl.co/view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><br/><B>Congratulations! </B>You have successfully transfered " + amount + " NEAR to " + receiver_id + ". Transaction ID: " + JSON.parse(body).hash + " <br/><table><tr><td>Hash:</td><td></td><td>" + JSON.parse(body).hash + "</td></tr><tr></tr><tr><td>Receiver ID:</td><td></td><td>" + JSON.parse(body).receiver_id + "</td></tr><tr></tr><tr><td>Nonce</td><td></td><td>" + JSON.parse(body).nonce + "</td></tr><tr></tr><tr><td>Public Key:</td><td></td><td>" + JSON.parse(body).public_key + "</td></tr><tr><tr><td>Signature:</td><td></td><td>" + JSON.parse(body).signature + "</td></tr><tr></tr><tr><td>Signer ID:</td><td></td><td>" + JSON.parse(body).signer_id + "</td></tr><tr></tr><tr><td>Account ID:</td><td></td><td>saurabhksinha900.testnet</td></tr><tr></tr></table><br/><a href='https://explorer.testnet.near.org/transactions/" + JSON.parse(body).hash + "' target='_blank'><input type='submit' value='Transaction Receipt' style='background-color:blue; border-color:black; color:white;  width:auto;'></div></body></html>");
    }
  }

  request(options, callback);


});

app.get('/receive', (req, res) => {

  res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='https://InfyNFT.saurabhksinha90.repl.co/home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='https://infynft.saurabhksinha90.repl.co/view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><h2  style='color:blue;'>Receive Asset</h2>      <br><br/><br><label for='account'>Account Address:</label>  <label for='account_value'>saurabhksinha900.testnet</label><br><br>   <br><br>      </div>  </body></html>");

});

app.get('/', (req, res) => {

  var options = {
    "method": "GET"
  };
  fetch('https://miserabletimelyquery.saurabhksinha90.repl.co/view_nft?account_id=saurabhksinha900.testnet', options).then(res => res.json())
    .then((jsontoken) => {
      console.log(jsontoken[0]);
      let text = '<html><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><body><div class="w3-container">   <div class="w3-bar w3-black">    <a href="https://InfyNFT.saurabhksinha90.repl.co/home" class="w3-bar-item w3-button w3-mobile w3-green">Home</a>   <a href="https://infynft.saurabhksinha90.repl.co/store_file" class="w3-bar-item w3-button w3-mobile">Upload File</a>    <a href="https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">NFT <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>       <a href="https://infynft.saurabhksinha90.repl.co/view_nft_marketplace" class="w3-bar-item w3-button w3-mobile">View NFT</a>        <a href="https://infynft.saurabhksinha90.repl.co/store_file" class="w3-bar-item w3-button w3-mobile">Store NFT</a>     </div>    </div> <a href="https://infynft.saurabhksinha90.repl.co/send" class="w3-bar-item w3-button w3-mobile">Send Asset</a><a href="https://infynft.saurabhksinha90.repl.co/receive" class="w3-bar-item w3-button w3-mobile">Receive Asset</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">Asset <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://infynft.saurabhksinha90.repl.co/send" class="w3-bar-item w3-button w3-mobile">Send</a>       <a href="https://infynft.saurabhksinha90.repl.co/receive" class="w3-bar-item w3-button w3-mobile">Receive</a>         </div>    </div></div>';
      text = text + "<H1 align='center'  style='color:blue;'> Rewards and Recognition Platform</h1><br><br><table align='center' style='border: 1px solid black;'><tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'><b>metadata_media</b></td><td align='center'style='border: 1px solid black;'> <b>token_id</b></td><td align='center' style='border: 1px solid black;'> <b>owner_id</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_title</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_description</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_copies</td><td align='center' style='border: 1px solid black;'> <b>Transfer NFT</b></td></tr>"

      for (var i = 0; i < jsontoken.length; i++) {

        text = text + "<tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'> <a href='https://infynft.saurabhksinha90.repl.co/nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><img height='37px' width='37px' src='" + (jsontoken[i].metadata_media).replace("?", "%3F") + "'></a></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].token_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].owner_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_title) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_description) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_copies) + "</b></td><td align='center' style='border: 1px solid black;'> <a href='https://infynft.saurabhksinha90.repl.co/nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><button onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;block&quot;' style='background-color:blue; border-color:black; color:white;  width:auto;'>Transfer NFT!</button></a></td></tr>";
      }
      text = text + "</table></div><br/><br/></body></html>";

      res.send(text);
    });
});


app.get('/store_file', (req, res) => {

  res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='https://InfyNFT.saurabhksinha90.repl.co/home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='https://infynft.saurabhksinha90.repl.co/view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div> <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div> </div><h2  style='color:blue;'>Store File via Moralis on IPFS</h2>    <form action='https://InfyNFT.saurabhksinha90.repl.co/store_success' method='get'>  <label for='path'>Path:</label>  <input type='text' id='path' name='path'><br><br>   <input type='submit' value='Upload' style='background-color:blue; border-color:black; color:white;  width:auto;'></form>   </div>  </body></html>");

});

app.get('/store_success', (req, res) => {
  var path = (req.query.path).replace("?", "\?");
  console.log('path' + path);
  request.get(path, function(error, response, body) {
    ``
    if (!error && response.statusCode == 200) {
      data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
      //console.log(data);
      fs.writeFile("writeMe.txt", data);


      fetch('https://deep-index.moralis.io/api/v2/ipfs/uploadFolder', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjY2ODM3OGE3LWVkMjItNDk0NS04NDM1LTFhMWUyMWE0YWQ1OCIsIm9yZ0lkIjoiMjEzMDM4IiwidXNlcklkIjoiMjEyNzE4IiwidHlwZUlkIjoiMzk2NTU3ZDItZjUwNi00NDQxLTlhYmEtMmUyZjM2OTBlNTFiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODU2Mzc4MTYsImV4cCI6NDg0MTM5NzgxNn0.Nsze3pKimlizkiimp4k6jE8aDEIWmAB_AuO5UCw-wVo',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([
          {
            'path': path,
            'content': data
          }
        ])
      }).then(res => res.json())
        .then(jsonData => {
          let a = (JSON.stringify(jsonData[0].path).replace("?", "%3F").replace(/[&]/g, "%26")).substring(1, (JSON.stringify(jsonData[0].path).replace("?", "%3F").replace(/[&]/g, "%26")).length - 1);
          console.log(jsonData);
          res.send('<html><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><body><div class="w3-container">   <div class="w3-bar w3-black">    <a href="https://InfyNFT.saurabhksinha90.repl.co/home" class="w3-bar-item w3-button w3-mobile w3-green">Home</a>   <a href="https://infynft.saurabhksinha90.repl.co/store_file" class="w3-bar-item w3-button w3-mobile">Upload File</a>    <a href="https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">NFT <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>       <a href="https://infynft.saurabhksinha90.repl.co/view_nft_marketplace" class="w3-bar-item w3-button w3-mobile">View NFT</a>        <a href="https://infynft.saurabhksinha90.repl.co/store_file" class="w3-bar-item w3-button w3-mobile">Store NFT</a>     </div>    </div> <a href="https://infynft.saurabhksinha90.repl.co/send" class="w3-bar-item w3-button w3-mobile">Send Asset</a><a href="https://infynft.saurabhksinha90.repl.co/send" class="w3-bar-item w3-button w3-mobile">Receive Asset</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">Asset <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://infynft.saurabhksinha90.repl.co/send" class="w3-bar-item w3-button w3-mobile">Send</a>       <a href="https://infynft.saurabhksinha90.repl.co/receive" class="w3-bar-item w3-button w3-mobile">Receive</a>         </div>    </div> </div><br/><b>Congratulations! Your file is successfully uploaded to IPFS via Moralis.</b><br/></br><img height="300px" src=' + JSON.stringify(jsonData[0].path).replace("?", "%3F") + '></br><br/><table><tr><td><b>File Path:</b><br/>' + path + '</td></tr><tr></tr><tr><td><br/><b>IPFS File Path:<br/></b>' + (JSON.stringify(jsonData[0].path).replace("?", "%3F")).substring(1, (JSON.stringify(jsonData[0].path).replace("?", "%3F")).length - 1) + '</td></tr></table><br/><a href="https://infynft.saurabhksinha90.repl.co/store_file"><button style="background-color:grey; border-color:black; color:white; width:33%;" type="submit">BACK</button></a>     <a href="https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' + a + '"><button style="background-color:green; border-color:black; color:white; width:33%;">MINT</button></a>     <a href="https://InfyNFT.saurabhksinha90.repl.co/home"><button  style="background-color:blue; border-color:black; color:white;  width:33%;" type="submit">HOME</button></a><br/><br/></div></body></html>')
        });
    }
  });
});

app.get('/nft_mint', (req, res) => {
  var metadata_media = (req.query.metadata_media);

  console.log('hi' + metadata_media);
  res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='https://InfyNFT.saurabhksinha90.repl.co/home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='https://infynft.saurabhksinha90.repl.co/view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div> <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div> </div><h2 style='color:blue;'>Store File via Moralis on IPFS</h2>   <div class='container'>  <form action='https://InfyNFT.saurabhksinha90.repl.co/nft_mint_success' method='get'>  <label for='token_id'><b>Token ID:</b></label>  <input type='text' id='token_id' name='token_id'value='This should be unique!'><label for='receiver_id'><b>Receiver ID:</b></label>  <input type='text' id='receiver_id' name='receiver_id' value='saurabhksinha900.testnet'><label for='description'><b>Description:</b></label>  <input type='text' id='description' name='description' value='Please write your description here!'><label for='contract'><b>Contract:</b></label>  <input type='text' id='contract' name='contract' value='saurabhksinha900.testnet'><label for='account_id'><b>Account ID:</b></label>  <input type='text' id='account_id' name='account_id' value='saurabhksinha900.testnet'><label for='seed_phrase'><b>Seed Phrase:</b></label>  <input type='text' id='seed_phrase' name='seed_phrase' value='next scene fury above pyramid travel chef help envelope invite surge slot'><label for='metadata_title'><b>Metadata Title:</b></label>  <input type='text' id='metadata_title' name='metadata_title' value='Test NFT'><label for='metadata_media'><b>Metadata Media:</b></label><input type='text' id='media' name='media' value=" + metadata_media.replace("?", "%3F").replace(/[&]/g, "%26") + "><br><br>   <input type='submit' value='Submit'></form>   </div></body></html>");

});

app.get('/nft_mint_success', (req, res) => {
  var token_id = req.query.token_id;
  var receiver_id = req.query.receiver_id;
  var description = req.query.description;
  var contract = req.query.contract;
  var account_id = req.query.account_id;
  var seed_phrase = req.query.seed_phrase;
  var metadata_title = req.query.metadata_title;
  var media = (req.query.media).replace("?", "%3F").replace(/[&]/g, "%26");
  console.log('NFT mint success!');
  console.log(token_id);
  console.log(receiver_id);
  console.log(description);
  console.log(contract);
  console.log(account_id);
  console.log(seed_phrase);
  console.log(metadata_title);
  console.log(media);

  var request = require('request');

  var options = {
    url: 'https://miserabletimelyquery.saurabhksinha90.repl.co/mint_nft?token_id=' + token_id + '&receiver_id=' + receiver_id + '&description=' + description + '&media=' + media.replace("?", "%3F").replace(/[&]/g, "%26") + '&contract=' + contract + '&account_id=' + account_id + '&seedphrase=' + seed_phrase + '&title=' + metadata_title
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send("<html><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='https://InfyNFT.saurabhksinha90.repl.co/home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='https://infynft.saurabhksinha90.repl.co/view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><br/><img height='300px' src='" + media + "'><br/><B>Congratulations! </B>Your NFT has been minted successfully. Transaction ID: " + body + "<br/><table><tr><td>Token ID:</td><td></td><td>" + token_id + "</td></tr><tr></tr><tr><td>Receiver ID:</td><td></td><td>" + receiver_id + "</td></tr><tr></tr><tr><td>Description</td><td></td><td>" + description + "</td></tr><tr></tr><tr><td>Metadata Title:</td><td></td><td>" + metadata_title + "</td></tr><tr><tr><td>Media:</td><td></td><td>" + media + "</td></tr><tr></tr><tr><td>Contract:</td><td></td><td>" + contract + "</td></tr><tr></tr><tr><td>Account ID:</td><td></td><td>" + account_id + "</td></tr><tr></tr><tr><td>Seed Phrase:</td><td></td><td>" + seed_phrase + "</td></tr><tr></tr></table><br/><a href='https://explorer.testnet.near.org/transactions/" + body + "' target='_blank'><input type='submit' value='Transaction Receipt' style='background-color:blue; border-color:black; color:white;  width:auto;'></div></body></html>");
    }
  }

  request(options, callback);


});

app.get('/nft_transfer', (req, res) => {
  var token_id = req.query.token_id;
  var metadata_media = req.query.metadata_media;
  var owner_id = req.query.owner_id;
  var metadata_description = req.query.metadata_description;
  var metadata_title = req.query.metadata_title;
  var metadata_copies = req.query.metadata_copies;
  var metadata_media_hash = req.query.metadata_media_hash;
  var metadata_issued_at = req.query.metadata_issued_at;
  var metadata_expires_at = req.query.metadata_expires_at;
  var metadata_starts_at = req.query.metadata_starts_at;
  var metadata_updated_at = req.query.metadata_updated_at;
  var metadata_reference = req.query.metadata_reference;
  var metadata_reference_hash = req.query.metadata_reference_hash;
  var metadata_extra = req.query.metadata_extra;
  var metadata_reference = req.query.metadata_reference;
  var approved_account_ids = req.query.approved_account_ids;
  let text = "<head><style>body {font-family: Arial, Helvetica, sans-serif;}/* Full-width input fields */input[type=text], input[type=password] {  width: 100%;  padding: 12px 20px;  margin: 8px 0;  display: inline-block;  border: 1px solid #ccc;  box-sizing: border-box;}/* Set a style for all buttons */button {  background-color: #04AA6D;  color: white;  padding: 14px 20px;  margin: 8px 0;  border: none;  cursor: pointer;  width: 100%;}button:hover {  opacity: 0.8;}/* Extra styles for the cancel button */.cancelbtn {  width: auto;  padding: 10px 18px;  background-color: #f44336;}/* Center the image and position the close button */.imgcontainer {  text-align: center;  margin: 24px 0 12px 0;  position: relative;}img.avatar {  width: 20%;  border-radius: 50%;}.container {  padding: 16px;}span.psw {  float: right;  padding-top: 16px;}/* The Modal (background) */.modal {  display: none; /* Hidden by default */  position: fixed; /* Stay in place */  z-index: 1; /* Sit on top */  left: 0;  top: 0;  width: 100%; /* Full width */  height: 100%; /* Full height */  overflow: auto; /* Enable scroll if needed */  background-color: rgb(0,0,0); /* Fallback color */  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */  padding-top: 60px;}/* Modal Content/Box */.modal-content {  background-color: #fefefe;  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */  border: 1px solid #888;  width: 80%; /* Could be more or less, depending on screen size */}/* The Close Button (x) */.close {  position: absolute;  right: 25px;  top: 0;  color: #000;  font-size: 35px;  font-weight: bold;}.close:hover,.close:focus {  color: red;  cursor: pointer;}/* Add Zoom Animation */.animate {  -webkit-animation: animatezoom 0.6s;  animation: animatezoom 0.6s}@-webkit-keyframes animatezoom {  from {-webkit-transform: scale(0)}   to {-webkit-transform: scale(1)}}  @keyframes animatezoom {  from {transform: scale(0)}   to {transform: scale(1)}}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) {  span.psw {     display: block;     float: none;  }  .cancelbtn {     width: 100%;  }}</style></head>  <link rel='stylesheet' href='/w3css/3/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css'><section>  <img class='mySlides' src='" + metadata_media + "'  style='width:50%; height:50%;'>  </section><section class='w3-container w3-center w3-content' style='max-width:1000px'>  <h2 class='w3-wide'>" + metadata_title + "</h2>  <p class='w3-opacity'><i>Owner ID: " + owner_id + "</i></p> <p class='w3-opacity'><i>Token ID: " + token_id + "</i></p> <p class='w3-opacity'><i>Metadata Media URL: " + metadata_media + "</i></p> <p class='w3-opacity'><i>Metadata Copies: " + metadata_copies + "</i></p><p class='w3-justify'>Metadata Description: " + metadata_description + "</p><p class='w3-justify'>Metadata Media Hash: " + metadata_media_hash + "</p><p class='w3-justify'>Metadata Issued At: " + metadata_issued_at + "</p><p class='w3-justify'>Metadata Expires At: " + metadata_expires_at + "</p><p class='w3-justify'>Metadata Starts At: " + metadata_starts_at + "</p><p class='w3-justify'>Metadata Updated At: " + metadata_updated_at + "</p><p class='w3-justify'>Metadata Extra: " + metadata_extra + "</p><p class='w3-justify'>Metadata Reference: " + metadata_reference + "</p><p class='w3-justify'>Metadata Reference Hash: " + metadata_reference_hash + "</p><p class='w3-justify'>Approved Account Ids: " + approved_account_ids + "</p> </section><button onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;block&quot'; style='width:auto;'>Transfer</button></br></br><footer class='w3-container w3-padding-64 w3-center w3-black w3-xlarge'>  <a ref='#'><i class='fa fa-facebook-official'></i></a>  <a href='#'><i class='fa fa-pinterest-p'></i></a>  <a href='#'><i class='fa fa-twitter'></i></a>  <a href='#'><i class='fa fa-flickr'></i></a>  <a href='#'><i class='fa fa-linkedin'></i></a>  <p class='w3-medium'>  </p></footer> <div id='id01' class='modal'>    <form class='modal-content animate' action='https://InfyNFT.saurabhksinha90.repl.co/success_nft_transfer' method='get'>    <div class='imgcontainer'>      <span onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;none&quot;' class='close' title='Close Modal'>&times;</span>      <img src='https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png' alt='Avatar' class='avatar'>    </div>    <div class='container'>      <label for='receiver_id'><b>Receiver Address</b></label>      <input type='text' placeholder='Enter Username' name='receiver_id' required>  <input type = 'hidden' name = 'token_id' value = '" + token_id + "' />               <button type='submit'>Transfer</button>        </div>    <div class='container' style='background-color:#f1f1f1'>      <button type='button' onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;none&quot;' class='cancelbtn'>Cancel</button>          </div>  </form></div><script>var modal = document.getElementById('id01');window.onclick = function(event) {    if (event.target == modal) {        modal.style.display = 'none';    }}</script>";
  res.send(text);
});
app.get('/success_nft_transfer', (req, res) => {

  var token_id = req.query.token_id;
  var receiver_id = req.query.receiver_id;
  var options = {
    "method": "GET"
  };
  fetch('https://miserabletimelyquery.saurabhksinha90.repl.co/transfer_nft?token_id=' + token_id + '&receiver_id=' + receiver_id + '&enforce_owner_id=saurabhksinha900.testnet&memo=Hi&contract=saurabhksinha900.testnet&seedphrase=next%20scene%20fury%20above%20pyramid%20travel%20chef%20help%20envelope%20invite%20surge%20slot', options).then(res => res.json())
    .then((jsontoken) => {
      res.send("<html><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='https://InfyNFT.saurabhksinha90.repl.co/home' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='https://infynft.saurabhksinha90.repl.co/view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='https://infynft.saurabhksinha90.repl.co/store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://infynft.saurabhksinha90.repl.co/send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='https://infynft.saurabhksinha90.repl.co/receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><br/><b>Transaction ID: " + jsontoken.tx + "</b><br/></br> <br/>Transferred Token Id " + token_id + " to " + receiver_id + ".<br/><br/><a href='https://explorer.testnet.near.org/transactions/" + jsontoken.tx + "'>Click Here to see more details!</a>'</div></body></html>");
    });


});
app.get('/view_nft_marketplace', (req, res) => {

  var options = {
    "method": "GET"
  };
  fetch('https://miserabletimelyquery.saurabhksinha90.repl.co/view_nft?account_id=saurabhksinha900.testnet', options).then(res => res.json())
    .then((jsontoken) => {
      console.log(jsontoken[0]);
      let text = '<html><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><body><div class="w3-container">   <div class="w3-bar w3-black">    <a href="https://InfyNFT.saurabhksinha90.repl.co/home" class="w3-bar-item w3-button w3-mobile w3-green">Home</a>   <a href="https://infynft.saurabhksinha90.repl.co/store_file" class="w3-bar-item w3-button w3-mobile">Upload File</a>    <a href="https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">NFT <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://infynft.saurabhksinha90.repl.co/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>       <a href="https://infynft.saurabhksinha90.repl.co/view_nft_marketplace" class="w3-bar-item w3-button w3-mobile">View NFT</a>        <a href="https://infynft.saurabhksinha90.repl.co/store_file" class="w3-bar-item w3-button w3-mobile">Store NFT</a>     </div>    </div> <a href="https://infynft.saurabhksinha90.repl.co/send" class="w3-bar-item w3-button w3-mobile">Send Asset</a><a href="https://infynft.saurabhksinha90.repl.co/receive" class="w3-bar-item w3-button w3-mobile">Receive Asset</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">Asset <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://infynft.saurabhksinha90.repl.co/send" class="w3-bar-item w3-button w3-mobile">Send</a>       <a href="https://infynft.saurabhksinha90.repl.co/receive" class="w3-bar-item w3-button w3-mobile">Receive</a>         </div>    </div></div>';
      text = text + "<H1 align='center'  style='color:blue;'> Rewards and Recognition Platform</h1><br><br><table align='center' style='border: 1px solid black;'><tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'><b>metadata_media</b></td><td align='center'style='border: 1px solid black;'> <b>token_id</b></td><td align='center' style='border: 1px solid black;'> <b>owner_id</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_title</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_description</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_copies</td><td align='center' style='border: 1px solid black;'> <b>Transfer NFT</b></td></tr>"

      for (var i = 0; i < jsontoken.length; i++) {

        text = text + "<tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'> <a href='https://infynft.saurabhksinha90.repl.co/nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><img height='37px' width='37px' src='" + (jsontoken[i].metadata_media).replace("?", "%3F") + "'></a></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].token_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].owner_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_title) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_description) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_copies) + "</b></td><td align='center' style='border: 1px solid black;'> <a href='https://infynft.saurabhksinha90.repl.co/nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><button onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;block&quot;' style='background-color:blue; border-color:black; color:white;  width:auto;'>Transfer NFT!</button></a></td></tr>";
      }
      text = text + "</table></div><br/><br/></body></html>";

      res.send(text);
    });
});


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
