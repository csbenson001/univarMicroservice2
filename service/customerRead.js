//var request = require('request'); // if we need to make a web service call, then probably best to use axios... it is easy.
var MongoClient = require('mongodb').MongoClient;


// variables, move to envt file
// need to get the process env file to work...
var url = (process.env.MONGODB_CONNECTION_STRING || 'mongodb://user90bd44:821bc8LIkumxQc01be9@cluster-pgrs1001-0-us-east-1-scalabledbs.cloudstrap.io:29001,cluster-pgrs1001-1-us-east-1-scalabledbs.cloudstrap.io:29001,cluster-pgrs1001-2-us-east-1-scalabledbs.cloudstrap.io:29001/pg-app-2-us-u8e29vmtak05z6erwl2vcuhukq5trh?replicaSet=pgrs1001&ssl=true');
// Database Name
const dbName = (process.env.DB_NAME || 'pg-app-2-us-u8e29vmtak05z6erwl2vcuhukq5trh');

// this is the exporting function... each item here is a method...
var customerRead = {

  // a simple hello world method.
  test: async function(req, res, next) {

        var response = {
          "customerName": 'univar',
          "customerAddress": '1234 main street, chicago, il'
        }
        res.send(response);
      },

  // the main read method.
  read: async function(req, res, next) {

          const client = await MongoClient.connect(url, { useNewUrlParser: true }) //would like to cache the connection if possible
              .catch(err => { console.log('Error connecting', err); });

          // check for errors and bail if we have a problem.
          if (!client) {
              console.log('unable to connect');
              return ('unable to connect'); // need to throw a real error here.
          }

        try{
          // if we are here, then we have a connection and can keep going...
            console.log('yay we are connected');

            // read the customer data.
            var customerId = '3323';
            const db = client.db(dbName);
            let collection = db.collection('Customer');
            let query = { 'CustomerId': customerId }
            let res = await collection.findOne(query);
            console.log(res);

            // we need to add any transformation logic here for the result...
            var response = res;

            // send the result back...
            return response;
        }
        catch(err) //this will trap any errors in the function...
        {
          console.log('error', err);
          return err;
        }
        finally{ //this is done at the very end... can do cleanup logic here...
          console.log('closing up shop...');
          client.close(); // need to figure out how to close the connection... this is giving me a scope error.
        }

      },

};

// export the methods...
module.exports = customerRead;
