import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

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
            timestamps: false,
            hooks: {
                beforeCreate: async (user) => {
                    user.password = await bcrypt.hash(user.password, 10);
                    console.log("password hashed");
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed("password")) {
                    user.password = await bcrypt.hash(user.password, 10);
                    console.log("password updated");
                }
            },
            afterCreate: async (user) => {
                console.log("user created");
            }
        });
    }

    static associate(models) {
        User.hasMany(models.Post, { foreignKey: "author_id" });
        User.hasMany(models.Comment, { foreignKey: "user_id" });
    }
}

export default User;
