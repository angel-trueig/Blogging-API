const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("blog_api", "postgres", "@Angel111", {
    host: "localhost",
    port: 5433,
    dialect: "postgres",
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;
