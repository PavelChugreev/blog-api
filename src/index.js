require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser')
const postRoutes = require('./routes/posts');
const svlRoutes = require('./routes/svl');
const app = express();


const port = process.env.PORT;

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      // autoIndex: false
    });
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

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/api/posts', postRoutes);
app.use('/api/tg-bot/svl', svlRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://localhost:${port}`)
});
