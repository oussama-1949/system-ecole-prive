const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const studentRoutes = require('./routes/studentRoutes');


const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', studentRoutes);


app.get('/', (req:any, res:any) => {
  res.json({ message: 'Backend OK ✅' });
});

module.exports = app;
