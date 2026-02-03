import { Model, DataTypes } from "sequelize";
import Post from "./post.js";

class Comment extends Model {
    static initModel(sequelize) {
        Comment.init({
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            content: { type: DataTypes.TEXT, allowNull: false },
            post_id: { type: DataTypes.INTEGER, allowNull: false },
            user_id: { type: DataTypes.INTEGER, allowNull: false },
            parent_id: { type: DataTypes.INTEGER, allowNull: true },
            is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
            deleted_at: { type: DataTypes.DATE, allowNull: true },
        }, {
            sequelize,
            modelName: "comment",
            tableName: "comments",
            underscored: true,
            timestamps: true
        });

    }

    static associate(models) {
        Comment.belongsTo(models.User, { foreignKey: "user_id" });
        Comment.belongsTo(models.Post, { foreignKey: "post_id" });

        Comment.hasMany(Comment, {
            as: 'replies',
            foreignKey: 'parent_id',
            onDelete: 'CASCADE'
        });

        Comment.belongsTo(Comment, {
            as: 'parent',
            foreignKey: 'parent_id'
        });
    }
}

export default Comment;
