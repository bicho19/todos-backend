module.exports = {

    createTodoSchema: {
        body: {
            type: "object",
            required: ["title"],
            properties: {
                title: {
                    type: "string",
                    nullable: false,
                    minLength: 5,
                },
                description: {
                    type: "string",
                    nullable: true,
                    minLength: 5,
                },
                dueBy: {
                    type: "string",
                    nullable: true,
                    pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$'
                },
            }
        }
    },

    updateTodoOrderSchema: {
        body: {
            type: 'array',
            maxItems: 2,
            minItems: 2,
            uniqueItems: true,
            items: {
                type: 'object',
                required: ['id', 'order'],
                properties: {
                    id: {
                        type: 'string',
                        nullable: false,
                        format: "uuid"
                    },
                    order: {
                        type: 'number',
                        nullable: false,
                        minimum: 1,
                    }
                }
            }
        }
    },

    markTodoAsCompletedSchema: {
        params: {
            type: "object",
            required: ["id"],
            properties: {
                id: {
                    type: 'string',
                    nullable: false,
                    format: "uuid"
                },
            }
        }
    }
}