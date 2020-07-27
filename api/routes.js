'use strict';

const controller = require('./controller');

module.exports = function(app) {
   app.route('/about')
       .get(controller.about);
   app.route('/customer')
       .get(controller.customerRead);
   app.route('/customerList')
       .get(controller.customerList);

  // my hello world test for a distance calculation... not for the final service.
   app.route('/distance/:zipcode1/:zipcode2')
       .get(controller.getDistance);
};
