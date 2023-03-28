const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
var mytoken = Math.random()
app.use('/login', (req, res) => {
  res.send({
    token: mytoken
  });
});

app.get('/demo', (req, res) => {
  res.send({
    username:'haris',
    password:'123456',
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));