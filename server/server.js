const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/albumnic');
const BucketListSchema = new mongoose.Schema({
  name: String,
  description: String
});
const BucketListModel = mongoose.model('buckets', BucketListSchema);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/buckets', (req, res) => {
  BucketListModel.create({ name: req.body.name, description: req.body.description }).then(bucket => {
    res.send(bucket);
  }).catch(err => res.send(err));
});

app.get('/buckets', (req, res) => {
  BucketListModel.find().then(buckets => {
    res.send(buckets);
  }).catch(err => res.send(err))
});

app.put('/update-many', (req, res) => {
  BucketListModel.find().then(buckets => {
    const arr_of_bucket_promises = buckets.map((bucket, i) => {
      const newBucket = bucket;
      newBucket.name = `An activity ${i + 1}`;
      return BucketListModel.findByIdAndUpdate(bucket._id, newBucket)
    });
    return Promise.all(arr_of_bucket_promises).then(allRes => {
      res.send(allRes);
    }).catch(err => {
      res.send(err);
    })
  }).catch(err => res.send(err))
});

app.put('/bulk-update', (req, res) => {
  BucketListModel.find().then(buckets => {
    (async () => {
      const arr_of_bucket_promises = buckets.map((bucket, i) => {
        const newBucket = bucket;
        newBucket.name = `An activity ${i}`;
        return BucketListModel.findByIdAndUpdate(bucket._id, newBucket)
      })
      const resolvedPromises = await Promise.all(arr_of_bucket_promises);
      res.send(resolvedPromises);
    })();
  }).catch(err => res.send(err))
});


app.listen(3001, () => console.log('server running'));