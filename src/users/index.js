const usersRouter = require("./users-routes");

module.exports = (app) => {

    // register users router
    app.register(usersRouter, {prefix: "/api/v1/users"})
}