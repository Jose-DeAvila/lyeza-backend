const bodyParser = require('body-parser');
const express = require('express');
const router = require('./router/index');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: "http://localhost:3000"}));

// Rutas
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hola mundo');
});

app.listen(PORT, (error) => {
  if(error){
    throw error
  }

  console.log(`Server running on http://localhost:${PORT}`);
});
