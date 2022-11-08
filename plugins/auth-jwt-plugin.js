const fp = require("fastify-plugin")
const {ErrorResponse} = require("../utils/response-schema");


function fastifyAuthJwt(fastify, options, done) {
    fastify.decorate("authenticate", async function (request, reply) {
        try {

            if (!request.headers.authorization) {
                return reply.code(401).send(ErrorResponse(401, `No token was supplied`))
            }
            const token = request.headers.authorization.replace('Bearer ', '');

            let jwtVerification = await fastify.jwt.verify(token)

            // We are sure that the verification has been done, since no error was raised
            // now we can use the decoded.id to get the user from the database

            request.userId = jwtVerification.id;

        } catch (error) {
            reply.code(401).send(error);
        }
    })
    done()
}


module.exports = fp(fastifyAuthJwt)