const path = require("path");
const routes = require('./routes');


// Initiate the env file
require('dotenv').config({
    path: path.join(__dirname, '.env')
});

// Initialize the server
const fastify = require('fastify')({
    logger: true,
});

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send(
        {
            success: true,
        }
    );
});


// declare the routes
routes(fastify);


// Run the server
fastify.listen(
    {
        port: process.env.PORT || 5000,
        host: process.env.HOST || '0.0.0.0'
    }, function (err, address) {
        if (err) {
            fastify.log.error(err)
            process.exit(1)
        }
        // Server is now listening on ${address}
    }
);