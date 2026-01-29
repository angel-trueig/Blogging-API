'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.addColumn('posts', 'status', {
      type: Sequelize.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: 'active'
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('posts', 'status');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_posts_status"')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
