const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://emjay:12345678@ds229648.mlab.com:29648/bucketlist');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const BucketListSchema = new mongoose.Schema({
  name: String,
  description: String
});

const BucketListModel = mongoose.model('buckets', BucketListSchema);

app.post('/buckets', (req, res) => {
  BucketListModel.create({name: req.body.name, description: req.body.description}).then(bucket => {
    res.send(bucket);
  }).catch(err => res.send(err));
});

app.get('/buckets', (req, res) => {
  BucketListModel.find().then(buckets => {
    res.send(buckets);
  }).catch(err => res.send(err))
});


app.listen(3001, () => console.log('server running'));