

module.exports = {

    createUserAccountSchema: {
        body: {
            type: "object",
            required: ["name", "email"],
            properties: {
                name: {
                    type: "string",
                    nullable: false,
                    minLength: 3,
                },
                email: {
                    type: "string",
                    nullable: false,
                    pattern: '[A-Z0-9a-z._+-]+@[A-Za-z0-9-]+\\.[A-Za-z]{2,5}',
                }
            }
        }
    }
}