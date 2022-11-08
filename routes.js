const Users = require("./src/users");
const Todos = require("./src/todos");

module.exports = (app) => {

    Users(app);
    Todos(app);
}