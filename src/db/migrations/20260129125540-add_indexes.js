'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('users', ['email'], {
      unique: true,
      name: 'users_email_idx'
    });

    await queryInterface.addIndex('posts', ['status'], {
      name: 'posts_status_idx'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('users', 'users_email_idx');
    await queryInterface.removeIndex('posts', 'posts_status_idx');
  }
};