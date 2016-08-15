'use strict';
var router = require('express').Router();
var csvs = require('../../../loadCSV')
module.exports = router;

router.get('/', function (req, res) {
    var playerKey = req.query.player;
    var fileKey = req.query.position.toLowerCase()+".csv";
    console.log(csvs[fileKey].fm.get(playerKey));
    res.send("OK");

});