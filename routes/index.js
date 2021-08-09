const express = require('express');
const request = require('request');
const axios = require('axios')
const router = express.Router();

const locationsModel = require('../models/locations');
const layerModel = require('../models/layer');
const helperModel = require('../models/helper');
const itemModel = require('../models/items');
const itemListModel = require('../models/item_list');


const mapController = require('../controllers/map');


/* GET home page. */
router.get('/', async (req, res, next) => {
  let loc = await locationsModel.find();
  res.render('index', { title: 'Chung tay đẩy lùi COVID-19', locations:loc});
});

/* GET json data. */
router.get('/mapjson/:name', function (req, res) {
    if (req.params.name) {
        layerModel.findOne({ name: req.params.name },{}, function (err, docs) {
            res.json(docs);
        });
    }
});

/* GET layers json data. */
router.get('/maplayers', function (req, res) {
    layerModel.find({},{'name': 1}, function (err, docs) {
        res.json(docs);
    });
});


router.get('/test', mapController.generate);

/* POST Map page. */
router.post('/map', async function(req,res) {
    let loc = await locationsModel.findOne({location:req.body.location});
    var helpers = await helperModel.find({typeOf:'helper'}).lean();

    let receivers = await helperModel.find({typeOf:'receiver'});

    for (let i = 0; i < helpers.length; i++) {
        helpers[i]._id = helpers[i]._id.toString();
        let items = await itemModel.findOne({id:helpers.items});

        // console.log(items.pices)
        console.log(helpers);
        for (let ii = 0; ii < items.pices.length; ii++) {
            let pice = await itemListModel.findOne({id:items.pices.id});
            // console.log(pice);
        }
    }
    
    layerModel.find({},{}, function(e,docs){
        res.render('map', {
            "jmap" : docs,
            lat : loc.latitude,
            lng : loc.longitude,
            'helpers' : helpers,
            'receivers' : receivers
        });
    });
});

/* GET layers json data. */
router.get('/mapbox', async function (req, res) {
    var helpers = await helperModel.find({typeOf:'helper'}).lean();
    let receivers = await helperModel.find({typeOf:'receiver'});

    res.render('mapbox', {
        'helpers' : helpers,
        'receivers' : receivers
    });
});

module.exports = router;
