'use strict';

const {DataTypes, Sequelize} = require("sequelize");
module.exports = {
    async up(queryInterface, Sequelize) {
        // Create the todos table
        await queryInterface.createTable("todos", {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            dueDate: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
        });
    },

    async down(queryInterface, Sequelize) {
        // Delete the todos table
        await queryInterface.dropTable("todos", {});
    }
};
