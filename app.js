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

// Connect to the database
require('./database/models');


// Compile AJV Formats
const addFormats = require("ajv-formats")
const Ajv = require('ajv')
const ajv = new Ajv({
    useDefaults: true,
    coerceTypes: true,
    $data: true,
    extendRefs: true
});
addFormats(ajv);
fastify.setValidatorCompiler(({schema, method, url, httpPart}) => {
    return ajv.compile(schema)
});

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
    }
);