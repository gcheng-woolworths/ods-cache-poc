const process = require('process');
const express = require('express');
const mongoose = require('mongoose');

const Item = require('./models/item');
const Reason = require('./models/reason');
const CampaignMeta = require('./models/campaign-meta');
const Partner = require('./models/partner');
const Store = require('./models/store');

const app = express();

const DB_URI = process.env['DB_URI'] || 'mongodb://mymongo:27017/ods';

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

mongoose.connect(DB_URI, { useNewUrlParser: true } )
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

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

app.get('/partners', (req, res) => {
  Partner.find().then(partners => {
    res.json({partners})
  });
});

app.get('/partners/:partnerId', (req, res) => {
  const { partnerId } = req.params;
  const q = { partnerId };
  Partner.find(q).then(([partner, ...rest]) => {
    console.log('partner', partner);
    res.json({ partner } );
  });
});

app.get('/partners/:partnerId/reasons/:reasonCode', (req, res) => {
  const { partnerId, reasonCode } = req.params;
  console.log(`search for partner ${partnerId}, reason ${reasonCode}`);
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

app.get('/partners/:partnerId/stores/:storeId', (req, res) => {
  const { partnerId, storeId } = req.params;
  console.log(`search for partner ${partnerId}, store ${storeId}`);
  const q = { partnerId, storeId };
  Store.find(q).then(store => {
    console.log('result->', store);
    res.json({store});
  });
});

app.get('/campaigns/:campaignId/meta', (req, res) => {
  const { campaignId } = req.params;
  console.log(`search for campaign ${campaignId}`);
  const q = { campaignId };
  CampaignMeta.find(q).then(meta => {
    console.log('meta->', meta);
    res.json({meta});
  })
});

module.exports = { app };
