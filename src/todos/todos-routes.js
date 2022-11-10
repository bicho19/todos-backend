const TodosHandlers = require("./todos-handlers");
const TodosSchemas = require("./todos-schemas");

module.exports = (fastify, options, done) => {


    fastify.get(
        "/myTodos",
        {
            onRequest: [fastify.authenticate],
        },
        TodosHandlers.fetchUserTodosHandler,
    );

    fastify.post(
        "/create",
        {
            onRequest: [fastify.authenticate],
            schema: TodosSchemas.createTodoSchema,
        },
        TodosHandlers.createTodoHandler,
    );

    fastify.put(
        "/updateOrder",
        {
            onRequest: [fastify.authenticate],
            schema: TodosSchemas.updateTodoOrderSchema,
        },
        TodosHandlers.updateTodosOrderHandler,
    );

    fastify.put(
        "/setCompleted/:id",
        {
            onRequest: [fastify.authenticate],
            schema: TodosSchemas.markTodoAsCompletedSchema,
        },
        TodosHandlers.markTodoAsCompletedHandler,
    );


    done();
}