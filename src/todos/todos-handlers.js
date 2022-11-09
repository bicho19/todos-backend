const {ErrorResponse, SuccessResponse} = require("../../utils/response-schema");
const {User, Todo} = require("../../database/models");
const {DataTypes, Sequelize, or} = require("sequelize");

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
                }
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
        try {

            //
            let todos = request.body;

            console.log(todos);


            return response.send(SuccessResponse(null, "still implementing"));
        } catch (exception){
            console.log(exception);
            return response.send(ErrorResponse(500, "Exception updating the todos order. Please try again"));
        }
    },
}