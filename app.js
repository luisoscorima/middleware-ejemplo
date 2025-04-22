const express = require('express');
const bodyParser = require('body-parser');
const enviarMensaje = require('./producer');

const app = express();
app.use(bodyParser.json());

app.post('/enviar', enviarMensaje);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
});