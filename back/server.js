const express = require( "express" );
var cors = require('cors')
const bodyParser = require("body-parser")
const {spawn} = require('child_process');
const { ok } = require("assert");
const app = express();
app.use(cors())
app.use(bodyParser.json());
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get('/', (req, res) => {
  console.log(req.query)
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['test.py', 'hola!', 'chau:c']);
  // collect data from script
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  console.log(dataToSend)
  res.send(dataToSend)
  });

});

app.post('/data', (req, res) => {
  console.log(JSON.stringify(req.body))
  res.sendStatus(200)
})

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});
