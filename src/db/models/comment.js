const { Model, DataTypes } = require("sequelize");

class Comment extends Model {
    static initModel(sequelize) {
        Comment.init({
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            content: { type: DataTypes.TEXT, allowNull: false },
            blog_id: { type: DataTypes.INTEGER, allowNull: false },
            user_id: { type: DataTypes.INTEGER, allowNull: false }
        }, {
            sequelize,
            modelName: "Comment",
            tableName: "comments",
            timestamps: false
        });
    }

    static associate(models) {
        Comment.belongsTo(models.User, { foreignKey: "user_id" });
        Comment.belongsTo(models.Blog, { foreignKey: "blog_id" });
    }
}

module.exports = Comment;
