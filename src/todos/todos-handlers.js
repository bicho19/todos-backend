const {ErrorResponse, SuccessResponse} = require("../../utils/response-schema");
const {User, Todo} = require("../../database/models");
const moment = require("moment");

module.exports = {

    /**
     * Fetch all user todos using the user ID
     * @param {FastifyRequest} request
     * @param {FastifyReply} response
     * @returns {Promise<>}
     */
    fetchUserTodosHandler: async (request, response) => {
        try {

            let allTodos = await Todo.findAll({
                where: {
                    userId: request.userId
                },
                order: [
                    ["state", "ASC"],
                    ["order", "ASC"]
                ]
            });

            if (!allTodos){
                return response.send(ErrorResponse(400, "Error fetching all todos"));
            }

            return response.send(SuccessResponse(allTodos));

        } catch (exception){
            console.log(exception);
            return response.send(ErrorResponse(500, "Exception login-in the user. Please try again"));
        }

    },

    /**
     * Create a new todo
     * @param {FastifyRequest} request
     * @param {FastifyReply} response
     * @returns {Promise<>}
     */
    createTodoHandler:  async (request, response) => {
        try {

            // first, fetch the last todo order
            let lastTodo = await Todo.findOne({
                where: {
                    userId: request.userId
                },
                order: [
                    ["createdAt", "DESC"]
                ]
            });

            // Generate the order
            let order = lastTodo ? lastTodo.getDataValue("order") + 1 : 1;


            // TODO: create a new todo with the logged in user
            let todo = await Todo.create({
                userId: request.userId,
                title: request.body.title,
                description: request.body.description ?? null,
                dueDate: request.body.dueBy ?? null,
                order,
                state: "pending"
            });

            if (!todo){
                return response.send(ErrorResponse(400, "Error creating new todo"));
            }

            return response.send(SuccessResponse(todo));
        } catch (exception){
            console.log(exception);
            return response.send(ErrorResponse(500, "Exception saving the todo. Please try again"));
        }
    },

    /**
     * Update todos order
     * @param {FastifyRequest} request
     * @param {FastifyReply} response
     * @returns {Promise<>}
     */
    updateTodosOrderHandler: async (request, response) => {
        let currentTransaction = await sequelize.transaction();
        try {

            let todos = request.body;

            // This is a simple test to limit the order to two consecutive orders only
            if (todos[0].order < todos[1].order && todos[0].order+1 !== todos[1].order){
                await currentTransaction.rollback();
                return response.send(ErrorResponse(400, "Error: Currently we only support changing orders to two consecutive todos"))
            }

            if (todos[0].order > todos[1].order && todos[0].order-1 !== todos[1].order){
                await currentTransaction.rollback();
                return response.send(ErrorResponse(400, "Error: Currently we only support changing orders to two consecutive todos"))
            }

            // Find the first todo
            let firstTodo = await Todo.findByPk(todos[0].id, {});
            if (!firstTodo){
                await currentTransaction.rollback();
                return response.send(ErrorResponse(400, "Error: Could not find the first todo"));
            }

            let secondTodo = await Todo.findByPk(todos[1].id, {});
            if (!secondTodo){
                await currentTransaction.rollback();
                return response.send(ErrorResponse(400, "Error: Could not find the second todo"));
            }

            // Change the second todos item to a temporary value, to work around the unique issue
            firstTodo.setDataValue("order", -100);
            secondTodo.setDataValue("order", todos[1].order);

            await firstTodo.save({transaction: currentTransaction});
            await secondTodo.save({transaction: currentTransaction});

            // Update the first todos item to its original order
            firstTodo.setDataValue("order", todos[0].order);
            await firstTodo.save({transaction: currentTransaction});

            // Temporary rollback the transaction
            await currentTransaction.commit();
            return response.send(SuccessResponse(null, "Todos updated with success"));
        } catch (exception){
            console.log(exception);
            if (currentTransaction){
                await currentTransaction.rollback();
            }
            return response.send(ErrorResponse(500, "Exception updating the todos order. Please try again"));
        }
    },

    /**
     * Set a todo as completed
     * @param {FastifyRequest} request
     * @param {FastifyReply} response
     * @returns {Promise<>}
     */
    markTodoAsCompletedHandler: async (request, response) => {
        try {
            //
            let todo = await Todo.findByPk(request.params.id, {});

            if (!todo){
                return response.send(ErrorResponse(400, "Could not find the todo"))
            }

            // update the state and completed at fields
            todo.setDataValue("state", "completed");
            todo.setDataValue("completedAt", moment().toISOString());


            await todo.save();


            return response.send(SuccessResponse(null, "the todo has been updated"));
        } catch (exception){
            console.log(exception);
            return response.send(ErrorResponse(500, "Exception updating the todo. Please try again"));
        }
    },
}