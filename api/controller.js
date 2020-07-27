'use strict';

// just a dummy set of files here...
var properties = require('../package.json')

// each microservice has it's key logic in a separate file so they can be individually built and maintained.
// for each microservice method we will add a new file here to separate concerns.
var customerRead = require('../service/customerRead'); //this is the actual service file for customer Read.
var customerList = require('../service/customerList'); //this is the actual service file for customer List.
var distance = require('../service/distance'); // another service for my testing...

// simple controller to handle events and make service call.
var controllers = {
   about: function(req, res) {
       var aboutInfo = {
           name: properties.name,
           version: properties.version
       }
       res.json(aboutInfo);
   },
   customerRead: async function(req, res) {
           let results = await customerRead.read(req, res);
           res.json(results);
       },

   customerList: async function(req, res) {
           let results = await customerList.list(req, res);
           res.json(results);
       },

   // a super simple tracer bullet practice
   customerTest: async function(req, res) {
           let results = customerRead.test(req, res);
           res.json(results);
       },

   // dummy zip code distance... just practicing on this one.
   getDistance: function(req, res) {
           distance.find(req, res, function(err, dist) {
               if (err)
                   res.send(err);
               res.json(dist);
           });
       },

};

module.exports = controllers;
