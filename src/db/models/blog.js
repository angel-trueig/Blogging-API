const { Model, DataTypes } = require("sequelize");

class Blog extends Model {
    static initModel(sequelize) {
        Blog.init({
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            title: { type: DataTypes.STRING, allowNull: false },
            content: { type: DataTypes.TEXT, allowNull: false },
            category: { type: DataTypes.STRING, allowNull: false },
            author_id: { type: DataTypes.INTEGER, allowNull: false }
        }, {
            sequelize,
            modelName: "Blog",
            tableName: "posts",
            timestamps: false
        });
    }

    static associate(models) {
        Blog.belongsTo(models.User, { foreignKey: "author_id" });
        Blog.hasMany(models.Comment, { foreignKey: "blog_id" });
    }
}

module.exports = Blog;
