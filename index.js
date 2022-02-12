const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

mongoose.connect( 'mongodb://localhost:2717/ods', { useNewUrlParser: true } )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const Item = require('./src/models/item');
const Reason = require('./src/models/reason');
const CampaignMeta = require('./src/models/campaign-meta');
const Store = require('./src/models/store');

app.get('/health-check', (req, res) => {
  res.send('OK');
});

app.get('/', (req, res) => {
  Item.find()
    .then(items => {
      console.log('items', items);
      res.json({items});
    });
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

app.get('/reasons/:reasonCode', (req, res) => {
  const { reasonCode } = req.params;
  const { partnerId } = req.query;
  console.log(`search for reason ${reasonCode}`);
  const q = { reasonCode };
  if (partnerId) {
    q.partnerId = partnerId;
  }
  console.log(`query object: ${JSON.stringify(q, null, 2)}`);

  Reason.find(q).then(reason => {
    console.log(reason);
    if (reason) {
      res.json({reason});
    } else {
      res.status(404).end();
    }
  })
});

app.get('/stores/:storeId', (req, res) => {
  const { storeId } = req.params;
  console.log(`search for store ${storeId}`);
  res.send(`store #${storeId}`);
});

app.get('/campaigns/:campaignId/meta', (req, res) => {
  const { campaignId } = req.params;
  console.log(`search for campaign ${campaignId}`);
  res.send(`campaign meta of campaign #${campaignId}`);
});

const port = 3000;

app.listen(port, () => console.log('Server running ...'));
