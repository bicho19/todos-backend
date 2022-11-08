'use strict';

const {DataTypes, Sequelize} = require("sequelize");
module.exports = {
    async up(queryInterface, Sequelize) {
        // Create the users table
        await queryInterface.createTable("users", {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            fullname: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            emailAddress: {
                type: DataTypes.STRING(100),
                allowNull: false,
                unique: true,
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
        // Delete the users table
        await queryInterface.dropTable("users", {});
    }
};
