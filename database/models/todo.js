const {Model, DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize, dataType) => {
    class Todo extends Model {
        /**
         * Helper method for defining associations
         * This method is not a part of Sequelize lifecycle
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Todo.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user'
            });
        }
    }

    Todo.init({
        id: {
            type: DataTypes.UUIDV4,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        userId: {
            type: DataTypes.UUIDV4,
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
    }, {
        sequelize,
        modelName: 'Todo',
        tableName: 'todos',
        paranoid: true,
    });

    return Todo;
}