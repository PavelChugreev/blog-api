const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var bodyParser = require('body-parser')
const postRoutes = require('./routes/posts');
const env = require('./env');
const app = express();

async function start() {
  try {
    await mongoose.connect(env.MONGO_URL, { useNewUrlParser: true });
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

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`App listening at http://localhost:${env.PORT}`)
});
