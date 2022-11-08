const UsersHandlers = require("./users-handlers");
const UsersSchemas = require("./users-schemas");

module.exports = (fastify, options, done) => {

    fastify.post(
        "/create",
        {
            schema: UsersSchemas.createUserAccountSchema,
        },
        UsersHandlers.createUserAccountHandler,
    );

    fastify.post(
        "/login",
        {
            schema: UsersSchemas.loginUserSchema,
        },
        UsersHandlers.loginUserHandler,
    );




    done();
}