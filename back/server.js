const express = require( "express" );
const cors = require('cors');
const bodyParser = require("body-parser");
const {spawn} = require('child_process');

const app = express();
app.use(cors())
app.use(bodyParser.json());
const port = 8080;

app.post('/data', (req, res) => {

  var monto_prestamo = req.body.montoPrestamo
  var cuota_mensual = req.body.cuotaMensual
  var cantidad_meses = req.body.cantidadMeses
  var nombre_banco = req.body.nombreBanco

  console.log(monto_prestamo, cuota_mensual, cantidad_meses, nombre_banco)

  var dataToSend;

  const python = spawn('python3', ['test.py', monto_prestamo, cuota_mensual, cantidad_meses]);

  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });

  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);

  const result = { nombreBanco: nombre_banco, montoPrestamo: monto_prestamo, cuotaMensual: cuota_mensual, cantidadMeses: cantidad_meses, CAE: dataToSend }
  if (parseFloat(result.CAE) >= 0){
    res.send(result)
  } else {
    res.sendStatus(500)
  }
  });

});

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
});
