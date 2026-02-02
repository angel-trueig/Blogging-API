'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('likes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refrences: {
          model: 'Users',
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        refrences: {
          model: 'Posts',
          key: 'id'
        },
        onDelete: "CASCADE"
      }
    });

    await queryInterface.addConstraint('likes', {
      fields: ['userId', 'postId'],
      type: 'unique',
      name: 'unique_like'
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('likes');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
