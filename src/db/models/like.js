import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database.config.js';

class Like extends Model {
    static initModel(sequelize) {
        Like.init({
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            userId: {
                type: DataTypes.INTEGER, allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            },
            postId: {
                type: DataTypes.INTEGER, allowNull: false,
                references: {
                    model: 'Posts',
                    key: 'id'
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        }, {
            sequelize,
            modelName: "Like",
            tableName: "likes",
            timestamps: false
        });
    }

    static associate(models) {
        Like.belongsTo(models.User, { foreignKey: "userId" });
        Like.belongsTo(models.Post, { foreignKey: "postId" });
    }
}

export default Like;

