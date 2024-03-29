const Prometheus = require('prom-client')
const express = require('express');
const http = require('http');
const path = require("path");
const homedir = require("os").homedir();
let fetch = require("node-fetch");
const fs = require('fs').promises;

Prometheus.collectDefaultMetrics();

const requestHistogram = new Prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['code', 'handler', 'method'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5]
})

const requestTimer = (req, res, next) => {
  const path = new URL(req.url, `http://${req.hostname}`).pathname
  const stop = requestHistogram.startTimer({
    method: req.method,
    handler: path
  })
  res.on('finish', () => {
    stop({
      code: res.statusCode
    })
  })
  next()
}

const app = express();
const server = http.createServer(app)

// See: http://expressjs.com/en/4x/api.html#app.settings.table
const PRODUCTION = app.get('env') === 'production';

// Administrative routes are not timed or logged, but for non-admin routes, pino
// overhead is included in timing.
app.get('/ready', (req, res) => res.status(200).json({status:"ok"}));
app.get('/live', (req, res) => res.status(200).json({status:"ok"}));
app.get('/metrics', async (req, res, next) => {
  const metrics = await Prometheus.register.metrics();
  res.set('Content-Type', Prometheus.register.contentType)
  res.end(metrics);
})

// Time routes after here.
app.use(requestTimer);

// Log routes after here.
const pino = require('pino')({
  level: PRODUCTION ? 'info' : 'debug',
});
app.use(require('pino-http')({logger: pino}));

app.get('/test1', (req, res) => {
  // Use req.log (a `pino` instance) to log JSON:
  req.log.info({message: 'Hello from Node.js Starter Application!'});
  res.send('Hello from Node.js Starter Application! Saurabh K Sinha');
});

app.get('/', (req, res) => {
  // Use req.log (a `pino` instance) to log JSON:
  //req.log.info({message: 'Hello from Node.js Starter Application!'});
  res.sendFile('index.html', { root: __dirname })
});



app.get('/home', (req, res) => {

  var options = {
    "method": "GET"
  };
  fetch('https://3.91.12.12/view_nft?account_id=saurabhksinha900.testnet', options).then(res => res.json())
    .then((jsontoken) => {
      console.log(jsontoken[0]);
      let text = '<html><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><body><div class="w3-container">   <div class="w3-bar w3-black">    <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/" class="w3-bar-item w3-button w3-mobile w3-green">Home</a>   <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file" class="w3-bar-item w3-button w3-mobile">Upload File</a>    <a href="https://3.94.182.176/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">NFT <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://3.94.182.176/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>       <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/view_nft_marketplace" class="w3-bar-item w3-button w3-mobile">View NFT</a>        <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file" class="w3-bar-item w3-button w3-mobile">Store NFT</a>     </div>    </div> <a href="https://3.94.182.176/send" class="w3-bar-item w3-button w3-mobile">Send Asset</a><a href="https://3.94.182.176/receive" class="w3-bar-item w3-button w3-mobile">Receive Asset</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">Asset <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://3.94.182.176/send" class="w3-bar-item w3-button w3-mobile">Send</a>       <a href="https://3.94.182.176/receive" class="w3-bar-item w3-button w3-mobile">Receive</a>         </div>    </div></div>';
      text = text + "<H1 align='center'  style='color:blue;'> Rewards and Recognition Platform</h1><br><br><table align='center' style='border: 1px solid black;'><tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'><b>metadata_media</b></td><td align='center'style='border: 1px solid black;'> <b>token_id</b></td><td align='center' style='border: 1px solid black;'> <b>owner_id</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_title</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_description</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_copies</td><td align='center' style='border: 1px solid black;'> <b>Transfer NFT</b></td></tr>"

      for (var i = 0; i < jsontoken.length; i++) {

        text = text + "<tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'> <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><img height='37px' width='37px' src='" + (jsontoken[i].metadata_media).replace("?", "%3F") + "'></a></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].token_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].owner_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_title) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_description) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_copies) + "</b></td><td align='center' style='border: 1px solid black;'> <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><button onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;block&quot;' style='background-color:blue; border-color:black; color:white;  width:auto;'>Transfer NFT!</button></a></td></tr>";
      }
      text = text + "</table></div><br/><br/></body></html>";

      res.send(text);
    });
});

app.get('/store_file', (req, res) => {

  res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='https://rnr990-rnr.apps.openhack.pvcz.p1.openshiftapps.com/' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='https://rnr990-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='https://3.94.182.176/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://3.94.182.176/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div> <a href='https://3.94.182.176/send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='https://3.94.182.176/receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://3.94.182.176/send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='https://3.94.182.176/receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div> </div><h2  style='color:blue;'>Store File via Moralis on IPFS</h2>    <form action='https://3.94.182.176/store_success' method='get'>  <label for='path'>Path:</label>  <input type='text' id='path' name='path'><br><br>   <input type='submit' value='Upload' style='background-color:blue; border-color:black; color:white;  width:auto;'></form>   </div>  </body></html>");

});

app.get('/store_success', (req, res) => {
  var path = (req.query.path).replace("?", "\?");
  console.log('path' + path);
  request.get(path, function(error, response, body) {
    ``
    if (!error && response.statusCode == 200) {
      data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
      //console.log(data);
      


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
          res.send('<html><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><body><div class="w3-container">   <div class="w3-bar w3-black">    <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/" class="w3-bar-item w3-button w3-mobile w3-green">Home</a>   <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file" class="w3-bar-item w3-button w3-mobile">Upload File</a>    <a href="https://3.94.182.176/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">NFT <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://3.94.182.176/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>       <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/view_nft_marketplace" class="w3-bar-item w3-button w3-mobile">View NFT</a>        <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file" class="w3-bar-item w3-button w3-mobile">Store NFT</a>     </div>    </div> <a href="https://3.94.182.176/send" class="w3-bar-item w3-button w3-mobile">Send Asset</a><a href="https://3.94.182.176/send" class="w3-bar-item w3-button w3-mobile">Receive Asset</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">Asset <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://3.94.182.176/send" class="w3-bar-item w3-button w3-mobile">Send</a>       <a href="https://3.94.182.176/receive" class="w3-bar-item w3-button w3-mobile">Receive</a>         </div>    </div> </div><br/><b>Congratulations! Your file is successfully uploaded to IPFS via Moralis.</b><br/></br><img height="300px" src=' + JSON.stringify(jsonData[0].path).replace("?", "%3F") + '></br><br/><table><tr><td><b>File Path:</b><br/>' + path + '</td></tr><tr></tr><tr><td><br/><b>IPFS File Path:<br/></b>' + (JSON.stringify(jsonData[0].path).replace("?", "%3F")).substring(1, (JSON.stringify(jsonData[0].path).replace("?", "%3F")).length - 1) + '</td></tr></table><br/><a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file"><button style="background-color:grey; border-color:black; color:white; width:33%;" type="submit">BACK</button></a>     <a href="https://3.94.182.176/nft_mint?metadata_media=' + a + '"><button style="background-color:green; border-color:black; color:white; width:33%;">MINT</button></a>     <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/"><button  style="background-color:blue; border-color:black; color:white;  width:33%;" type="submit">HOME</button></a><br/><br/></div></body></html>')
        });
    }
  });
});

app.get('/nft_mint', (req, res) => {
  var metadata_media = (req.query.metadata_media);

  console.log('hi' + metadata_media);
  res.send("<html><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><style>body {font-family: Arial, Helvetica, sans-serif;}input[type=text], input[type=password] {  width: 100%; padding: 12px 20px;  margin: 8px 0; display: inline-block;  border: 1px solid #ccc; box-sizing: border-box;}button {  background-color: #04AA6D; color: white;  padding: 14px 20px; margin: 8px 0;  border: none; cursor: pointer;  width: 100%;utton:hover {  opacity: 0.8;cancelbtn {  width: auto; padding: 10px 18px;  background-color: #f44336;imgcontainer {  text-align: center; margin: 24px 0 12px 0;}img.avatar {  width: 40%; border-radius: 50%;}.container {  padding: 16px;pan.psw {  float: right; padding-top: 16px;}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) { span.psw {     display: block;    float: none;  } .cancelbtn {     width: 100%; }}</style><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='https://3.94.182.176/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://3.94.182.176/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div> <a href='https://3.94.182.176/send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='https://3.94.182.176/receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://3.94.182.176/send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='https://3.94.182.176/receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div> </div><h2 style='color:blue;'>Store File via Moralis on IPFS</h2>   <div class='container'>  <form action='https://3.94.182.176/nft_mint_success' method='get'>  <label for='token_id'><b>Token ID:</b></label>  <input type='text' id='token_id' name='token_id'value='This should be unique!'><label for='receiver_id'><b>Receiver ID:</b></label>  <input type='text' id='receiver_id' name='receiver_id' value='saurabhksinha900.testnet'><label for='description'><b>Description:</b></label>  <input type='text' id='description' name='description' value='Please write your description here!'><label for='contract'><b>Contract:</b></label>  <input type='text' id='contract' name='contract' value='saurabhksinha900.testnet'><label for='account_id'><b>Account ID:</b></label>  <input type='text' id='account_id' name='account_id' value='saurabhksinha900.testnet'><label for='seed_phrase'><b>Seed Phrase:</b></label>  <input type='text' id='seed_phrase' name='seed_phrase' value='next scene fury above pyramid travel chef help envelope invite surge slot'><label for='metadata_title'><b>Metadata Title:</b></label>  <input type='text' id='metadata_title' name='metadata_title' value='Test NFT'><label for='metadata_media'><b>Metadata Media:</b></label><input type='text' id='media' name='media' value=" + metadata_media.replace("?", "%3F").replace(/[&]/g, "%26") + "><br><br>   <input type='submit' value='Submit'></form>   </div></body></html>");

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
    url: 'https://3.91.12.12/mint_nft?token_id=' + token_id + '&receiver_id=' + receiver_id + '&description=' + description + '&media=' + media.replace("?", "%3F").replace(/[&]/g, "%26") + '&contract=' + contract + '&account_id=' + account_id + '&seedphrase=' + seed_phrase + '&title=' + metadata_title
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.send("<html><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='https://3.94.182.176/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://3.94.182.176/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='https://3.94.182.176/send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='https://3.94.182.176/receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://3.94.182.176/send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='https://3.94.182.176/receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><br/><img height='300px' src='" + media + "'><br/><B>Congratulations! </B>Your NFT has been minted successfully. Transaction ID: " + body + "<br/><table><tr><td>Token ID:</td><td></td><td>" + token_id + "</td></tr><tr></tr><tr><td>Receiver ID:</td><td></td><td>" + receiver_id + "</td></tr><tr></tr><tr><td>Description</td><td></td><td>" + description + "</td></tr><tr></tr><tr><td>Metadata Title:</td><td></td><td>" + metadata_title + "</td></tr><tr><tr><td>Media:</td><td></td><td>" + media + "</td></tr><tr></tr><tr><td>Contract:</td><td></td><td>" + contract + "</td></tr><tr></tr><tr><td>Account ID:</td><td></td><td>" + account_id + "</td></tr><tr></tr><tr><td>Seed Phrase:</td><td></td><td>" + seed_phrase + "</td></tr><tr></tr></table><br/><a href='https://explorer.testnet.near.org/transactions/" + body + "' target='_blank'><input type='submit' value='Transaction Receipt' style='background-color:blue; border-color:black; color:white;  width:auto;'></div></body></html>");
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
  let text = "<head><style>body {font-family: Arial, Helvetica, sans-serif;}/* Full-width input fields */input[type=text], input[type=password] {  width: 100%;  padding: 12px 20px;  margin: 8px 0;  display: inline-block;  border: 1px solid #ccc;  box-sizing: border-box;}/* Set a style for all buttons */button {  background-color: #04AA6D;  color: white;  padding: 14px 20px;  margin: 8px 0;  border: none;  cursor: pointer;  width: 100%;}button:hover {  opacity: 0.8;}/* Extra styles for the cancel button */.cancelbtn {  width: auto;  padding: 10px 18px;  background-color: #f44336;}/* Center the image and position the close button */.imgcontainer {  text-align: center;  margin: 24px 0 12px 0;  position: relative;}img.avatar {  width: 20%;  border-radius: 50%;}.container {  padding: 16px;}span.psw {  float: right;  padding-top: 16px;}/* The Modal (background) */.modal {  display: none; /* Hidden by default */  position: fixed; /* Stay in place */  z-index: 1; /* Sit on top */  left: 0;  top: 0;  width: 100%; /* Full width */  height: 100%; /* Full height */  overflow: auto; /* Enable scroll if needed */  background-color: rgb(0,0,0); /* Fallback color */  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */  padding-top: 60px;}/* Modal Content/Box */.modal-content {  background-color: #fefefe;  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */  border: 1px solid #888;  width: 80%; /* Could be more or less, depending on screen size */}/* The Close Button (x) */.close {  position: absolute;  right: 25px;  top: 0;  color: #000;  font-size: 35px;  font-weight: bold;}.close:hover,.close:focus {  color: red;  cursor: pointer;}/* Add Zoom Animation */.animate {  -webkit-animation: animatezoom 0.6s;  animation: animatezoom 0.6s}@-webkit-keyframes animatezoom {  from {-webkit-transform: scale(0)}   to {-webkit-transform: scale(1)}}  @keyframes animatezoom {  from {transform: scale(0)}   to {transform: scale(1)}}/* Change styles for span and cancel button on extra small screens */@media screen and (max-width: 300px) {  span.psw {     display: block;     float: none;  }  .cancelbtn {     width: 100%;  }}</style></head>  <link rel='stylesheet' href='/w3css/3/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css'><section>  <img class='mySlides' src='" + metadata_media + "'  style='width:50%; height:50%;'>  </section><section class='w3-container w3-center w3-content' style='max-width:1000px'>  <h2 class='w3-wide'>" + metadata_title + "</h2>  <p class='w3-opacity'><i>Owner ID: " + owner_id + "</i></p> <p class='w3-opacity'><i>Token ID: " + token_id + "</i></p> <p class='w3-opacity'><i>Metadata Media URL: " + metadata_media + "</i></p> <p class='w3-opacity'><i>Metadata Copies: " + metadata_copies + "</i></p><p class='w3-justify'>Metadata Description: " + metadata_description + "</p><p class='w3-justify'>Metadata Media Hash: " + metadata_media_hash + "</p><p class='w3-justify'>Metadata Issued At: " + metadata_issued_at + "</p><p class='w3-justify'>Metadata Expires At: " + metadata_expires_at + "</p><p class='w3-justify'>Metadata Starts At: " + metadata_starts_at + "</p><p class='w3-justify'>Metadata Updated At: " + metadata_updated_at + "</p><p class='w3-justify'>Metadata Extra: " + metadata_extra + "</p><p class='w3-justify'>Metadata Reference: " + metadata_reference + "</p><p class='w3-justify'>Metadata Reference Hash: " + metadata_reference_hash + "</p><p class='w3-justify'>Approved Account Ids: " + approved_account_ids + "</p> </section><button onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;block&quot'; style='width:auto;'>Transfer</button></br></br><footer class='w3-container w3-padding-64 w3-center w3-black w3-xlarge'>  <a ref='#'><i class='fa fa-facebook-official'></i></a>  <a href='#'><i class='fa fa-pinterest-p'></i></a>  <a href='#'><i class='fa fa-twitter'></i></a>  <a href='#'><i class='fa fa-flickr'></i></a>  <a href='#'><i class='fa fa-linkedin'></i></a>  <p class='w3-medium'>  </p></footer> <div id='id01' class='modal'>    <form class='modal-content animate' action='https://3.94.182.176/success_nft_transfer' method='get'>    <div class='imgcontainer'>      <span onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;none&quot;' class='close' title='Close Modal'>&times;</span>      <img src='https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png' alt='Avatar' class='avatar'>    </div>    <div class='container'>      <label for='receiver_id'><b>Receiver Address</b></label>      <input type='text' placeholder='Enter Username' name='receiver_id' required>  <input type = 'hidden' name = 'token_id' value = '" + token_id + "' />               <button type='submit'>Transfer</button>        </div>    <div class='container' style='background-color:#f1f1f1'>      <button type='button' onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;none&quot;' class='cancelbtn'>Cancel</button>          </div>  </form></div><script>var modal = document.getElementById('id01');window.onclick = function(event) {    if (event.target == modal) {        modal.style.display = 'none';    }}</script>";
  res.send(text);
});
app.get('/success_nft_transfer', (req, res) => {

  var token_id = req.query.token_id;
  var receiver_id = req.query.receiver_id;
  var options = {
    "method": "GET"
  };
  fetch('https://3.91.12.12/transfer_nft?token_id=' + token_id + '&receiver_id=' + receiver_id + '&enforce_owner_id=saurabhksinha900.testnet&memo=Hi&contract=saurabhksinha900.testnet&seedphrase=next%20scene%20fury%20above%20pyramid%20travel%20chef%20help%20envelope%20invite%20surge%20slot', options).then(res => res.json())
    .then((jsontoken) => {
      res.send("<html><link rel='stylesheet' href='https://www.w3schools.com/w3css/4/w3.css'><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><body><div class='w3-container'>   <div class='w3-bar w3-black'>    <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/' class='w3-bar-item w3-button w3-mobile w3-green'>Home</a>   <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file' class='w3-bar-item w3-button w3-mobile'>Upload File</a>    <a href='https://3.94.182.176/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>NFT <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://3.94.182.176/nft_mint?metadata_media=' class='w3-bar-item w3-button w3-mobile'>Mint NFT</a>       <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/view_nft_marketplace' class='w3-bar-item w3-button w3-mobile'>View NFT</a>        <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file' class='w3-bar-item w3-button w3-mobile'>Store NFT</a>     </div>    </div>  <a href='https://3.94.182.176/send' class='w3-bar-item w3-button w3-mobile'>Send Asset</a><a href='https://3.94.182.176/receive' class='w3-bar-item w3-button w3-mobile'>Receive Asset</a>   <div class='w3-dropdown-hover w3-mobile'>      <button class='w3-button'>Asset <i class='fa fa-caret-down'></i></button>     <div class='w3-dropdown-content w3-bar-block w3-dark-grey'>        <a href='https://3.94.182.176/send' class='w3-bar-item w3-button w3-mobile'>Send</a>       <a href='https://3.94.182.176/receive' class='w3-bar-item w3-button w3-mobile'>Receive</a>         </div>    </div></div><br/><b>Transaction ID: " + jsontoken.tx + "</b><br/></br> <br/>Transferred Token Id " + token_id + " to " + receiver_id + ".<br/><br/><a href='https://explorer.testnet.near.org/transactions/" + jsontoken.tx + "'>Click Here to see more details!</a>'</div></body></html>");
    });


});
app.get('/view_nft_marketplace', (req, res) => {

  var options = {
    "method": "GET"
  };
  fetch('https://3.94.182.176/view_nft?account_id=saurabhksinha900.testnet', options).then(res => res.json())
    .then((jsontoken) => {
      console.log(jsontoken[0]);
      let text = '<html><link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><body><div class="w3-container">   <div class="w3-bar w3-black">    <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/" class="w3-bar-item w3-button w3-mobile w3-green">Home</a>   <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file" class="w3-bar-item w3-button w3-mobile">Upload File</a>    <a href="https://3.94.182.176/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">NFT <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://3.94.182.176/nft_mint?metadata_media=" class="w3-bar-item w3-button w3-mobile">Mint NFT</a>       <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/view_nft_marketplace" class="w3-bar-item w3-button w3-mobile">View NFT</a>        <a href="http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/store_file" class="w3-bar-item w3-button w3-mobile">Store NFT</a>     </div>    </div> <a href="https://3.94.182.176/send" class="w3-bar-item w3-button w3-mobile">Send Asset</a><a href="https://3.94.182.176/receive" class="w3-bar-item w3-button w3-mobile">Receive Asset</a>   <div class="w3-dropdown-hover w3-mobile">      <button class="w3-button">Asset <i class="fa fa-caret-down"></i></button>     <div class="w3-dropdown-content w3-bar-block w3-dark-grey">        <a href="https://3.94.182.176/send" class="w3-bar-item w3-button w3-mobile">Send</a>       <a href="https://3.94.182.176/receive" class="w3-bar-item w3-button w3-mobile">Receive</a>         </div>    </div></div>';
      text = text + "<H1 align='center'  style='color:blue;'> Rewards and Recognition Platform</h1><br><br><table align='center' style='border: 1px solid black;'><tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'><b>metadata_media</b></td><td align='center'style='border: 1px solid black;'> <b>token_id</b></td><td align='center' style='border: 1px solid black;'> <b>owner_id</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_title</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_description</b></td><td align='center' style='border: 1px solid black;'> <b>metadata_copies</td><td align='center' style='border: 1px solid black;'> <b>Transfer NFT</b></td></tr>"

      for (var i = 0; i < jsontoken.length; i++) {

        text = text + "<tr style='border: 1px solid black;'><td align='center' style='border: 1px solid black;'> <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><img height='37px' width='37px' src='" + (jsontoken[i].metadata_media).replace("?", "%3F") + "'></a></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].token_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].owner_id) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_title) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_description) + "</b></td><td align='center' style='border: 1px solid black;'> <b>" + (jsontoken[i].metadata_copies) + "</b></td><td align='center' style='border: 1px solid black;'> <a href='http://rn-r-109-rnr.apps.openhack.pvcz.p1.openshiftapps.com/nft_transfer?token_id=" + jsontoken[i].token_id + "&metadata_media=" + (jsontoken[i].metadata_media).replace("?", "%3F") + "&metadata_title=" + (jsontoken[i].metadata_title) + "&metadata_description=" + (jsontoken[i].metadata_description) + "&metadata_copies=" + (jsontoken[i].metadata_copies) + "&metadata_media_hash=" + (jsontoken[i].metadata_media_hash) + "&metadata_issued_at=" + (jsontoken[i].metadata_issued_at) + "&metadata_expires_at=" + (jsontoken[i].metadata_expires_at) + "&metadata_starts_at=" + (jsontoken[i].metadata_starts_at) + "&metadata_updated_at=" + (jsontoken[i].metadata_updated_at) + "&metadata_extra=" + (jsontoken[i].metadata_extra) + "&metadata_reference=" + (jsontoken[i].metadata_reference) + "&metadata_reference_hash=" + (jsontoken[i].metadata_reference_hash) + "&approved_account_ids=" + (jsontoken[i].approved_account_ids) + "&owner_id=" + (jsontoken[i].owner_id) + "'><button onclick='document.getElementById(&quot;id01&quot;).style.display=&quot;block&quot;' style='background-color:blue; border-color:black; color:white;  width:auto;'>Transfer NFT!</button></a></td></tr>";
      }
      text = text + "</table></div><br/><br/></body></html>";

      res.send(text);
    });
});

app.get('*', (req, res) => {
  res.status(404).send("Not Found");
});

// Listen and serve.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App started on PORT ${PORT}`);
});
