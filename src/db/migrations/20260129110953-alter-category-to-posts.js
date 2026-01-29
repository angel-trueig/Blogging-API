'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Convert the existing string column to ENUM
    await queryInterface.changeColumn('posts', 'category', {
      type: Sequelize.ENUM(
        'general',
        'technology',
        'health',
        'finance',
        'sports',
        'entertainment',
        'lifestyle'
      ),
      allowNull: false,
      defaultValue: 'general'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('posts', 'category', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_posts_category";');
  }
};
