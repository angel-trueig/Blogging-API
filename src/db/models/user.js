const { Model, DataTypes } = require("sequelize");

class User extends Model {
    static initModel(sequelize) {
        User.init({
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            username: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            password: { type: DataTypes.STRING, allowNull: false },
            role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" }
        }, {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: false
        });
    }

    static associate(models) {
        User.hasMany(models.Blog, { foreignKey: "author_id" });
        User.hasMany(models.Comment, { foreignKey: "user_id" });
    }
}

module.exports = User;
