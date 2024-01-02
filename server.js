const Prometheus = require('prom-client')
const express = require('express');
const http = require('http');
const path = require("path");
const homedir = require("os").homedir();


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

app.get('/test2', (req, res) => {
  // Use req.log (a `pino` instance) to log JSON:
  //req.log.info({message: 'Hello from Node.js Starter Application!'});
  res.sendFile('index.html', { root: __dirname })
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



app.get('*', (req, res) => {
  res.status(404).send("Not Found");
});

// Listen and serve.
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App started on PORT ${PORT}`);
});
