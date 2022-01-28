const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
require('./database/connection.js')(app);

app.get('/', (req, res) => {
  res.send('Hello World!!')
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


