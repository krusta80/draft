'use strict';
var router = require('express').Router();
var csvs = require('../../../loadCSV')
module.exports = router;

router.get('/', function (req, res) {
    var playerKey = req.params[player];
    var fileKey = req.params[position].toLowerCase()+".csv";
    console.log(csvs[fileKey].fm.get(playerKey));
    res.send("OK");

});