const {ErrorResponse, SuccessResponse} = require("../../utils/response-schema");
const {User} = require("../../database/models");

module.exports = {
    /**
     * Create a user account
     * @param {FastifyRequest} request
     * @param {FastifyReply} response
     * @returns {Promise<>}
     */
    createUserAccountHandler: async (request, response) => {
        try {

            // The request has been already validated before.
            // Check if the email already exists
            let oldUser = await User.findOne({
                where: {
                    emailAddress: request.body.email,
                }
            });

            if (oldUser){
                return response.send(ErrorResponse(400, "The email address already exists, please use another one"));
            }

            // Else, create the user
            let user = await User.create({
                fullname: request.body.name,
                emailAddress: request.body.email,
            });

            if (!user){
                return response.send(ErrorResponse(500, "Error saving the user, please try again"));
            }

            return response.send(SuccessResponse(null, "The user has been saved successfully. You can now login"));

        } catch (exception){
            console.log(exception);
            return response.send(ErrorResponse(500, "Exception creating the user. Please try again"));
        }
    }
}