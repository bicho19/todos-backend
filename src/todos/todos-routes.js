const TodosHandlers = require("./todos-handlers");
const TodosSchemas = require("./todos-schemas");

module.exports = (fastify, options, done) => {


    fastify.get(
        "/myTodos",
        {},
        TodosHandlers.fetchUserTodosHandler,
    );

    fastify.post(
        "/create",
        {
            schema: TodosSchemas.createTodoSchema,
        },
        TodosHandlers.createTodoHandler,
    );

    fastify.put(
        "/updateOrder",
        {
            schema: TodosSchemas.updateTodoOrderSchema,
        },
        TodosHandlers.updateTodosOrderHandler,
    );


    done();
}