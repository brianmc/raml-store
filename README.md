# RAML Store



## Overview

raml-store provides a simple storage API plus a persistence plugin which enables you to run the [RAML API Designer](https://github.com/mulesoft/api-designer) locally (rather than use the APIHub cloud service) and still be able to manage and collaborate on your design.

## Requirements
The service is built with node.js, using express and mongodb.

### Installing Node.js
Go to [nodejs.org](http://nodejs.org), and click the Install button.

### Installing MongoDB
To install MongoDB on your specific platform, refer to the [MongoDB QuickStart](http://docs.mongodb.org/manual/installation/).

To start mongodb as background process:

`cd /usr/local/mongodb`  (mongodb installation directory)


`mongod --fork --logpath /var/log/mongodb.log`


### Installing MongoDB Node.js Driver
From the top-level directory (e.g. raml-store):

`npm install mongodb`

### Installing Express
From the top-level directory (e.g. raml-store):

`npm install `

    
    
    
    
  
## Running the Service
From the top-level directory (e.g. raml-store):

`node server`

If you prefer to run the server in the background [forever](http://blog.nodejitsu.com/keep-a-nodejs-server-up-with-forever) is awesome. 

`npm install forever`

`forever start server`



## Testing the Service

`curl -i -X POST -H 'Content-Type: application/json' -d '{"name":"myfirstapi.raml","path":"/","contents":"#%25RAML%200.8%0Atitle:%20%20%20DONE!!!"}' http://localhost:3000/files`

`curl -i -X GET http://localhost:3000/files`



## Integration with API-Designer
Follow instructions at [api-designer](https://github.com/mulesoft/api-designer) to install and run API-Designer.  

Where they reference embedding the designer, you can simply copy the sample-designer from this project into the api-designer app directory (https://github.com/brianmc/raml-store/blob/master/sample-designer.html).

The important code is the script beginning at line 75, ending at line 202.



## Acknowledgements
Thanks to Christophe Coenraets, this API is based on his simple and easy-to-follow tutorial at http://coenraets.org/blog/2012/10/creating-a-rest-api-using-node-js-express-and-mongodb/
