'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('comments', "comment_count", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('comments', 'comment_count')
  }
};
