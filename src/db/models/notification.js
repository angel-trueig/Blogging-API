import { DataTypes } from "sequelize";
import sequelize from "../../config/database.config.js"

const Notification = sequelize.define("notification", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    reciever_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }

    },
    sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    notify_type: {
        type: DataTypes.ENUM("like", "comment", "follow", "subscription"),
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "posts",
            key: "id"
        }
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        tableName: "notifications",
        timestamps: true
    }

);

export default Notification;