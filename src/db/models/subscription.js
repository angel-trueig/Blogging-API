import { Model, DataTypes } from "sequelize";

class Subscription extends Model {
    static initModel(sequelize) {
        Subscription.init({
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            subscriber_id: { type: DataTypes.INTEGER, allowNull: false },
            author_id: { type: DataTypes.INTEGER, allowNull: false },
            isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
        }, {
            sequelize,
            modelName: "Subscription",
            tableName: "subscriptions",
            timestamps: true,
        });
    }
}

export default Subscription;