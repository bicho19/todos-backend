const {Model, DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize, dataType) => {
    class User extends Model {
        /**
         * Helper method for defining associations
         * This method is not a part of Sequelize lifecycle
         * The `models/index` file will call this method automatically
         */
        static associate(models) {
            User.hasMany(models.Todo, {
                foreignKey: 'userId',
                as: 'todos',
            });
        }
    }

    User.init({
        id: {
            type: DataTypes.UUIDV4,
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
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
    });

    return User;
}