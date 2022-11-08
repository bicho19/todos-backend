const todosRouter = require("./todos-routes");

module.exports = (app) => {

    // register users router
    app.register(todosRouter, {prefix: "/api/v1/todos"})
}