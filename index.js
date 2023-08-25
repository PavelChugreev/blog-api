const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser')
const postRoutes = require('./routes/posts');
const pass = 'keJdW2ZwpeIaqMqD';
const PORT = process.env.port || 4000;
const app = express();

async function start() {
  try {
    const url = "mongodb+srv://pchugreev:keJdW2ZwpeIaqMqD@cluster0.pqnzimt.mongodb.net/news";
    await mongoose.connect(url, { useNewUrlParser: true });
  } catch (e) {
    console.log(e);
  }
};
start();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use('/api/posts', postRoutes);

app.listen(PORT);
