"use strict";

export default {
  async up(queryInterface, Sequelize) {
    const posts = await queryInterface.sequelize.query(
      `SELECT id, title FROM posts`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    for (const post of posts) {
      let baseSlug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .trim();

      let slug = baseSlug;
      let count = 1;

      while (true) {
        const existing = await queryInterface.sequelize.query(
          `SELECT id FROM posts WHERE slug = :slug`,
          {
            replacements: { slug },
            type: Sequelize.QueryTypes.SELECT
          }
        );

        if (existing.length === 0) break;

        slug = `${baseSlug}-${count}`;
        count++;
      }

      await queryInterface.sequelize.query(
        `UPDATE posts SET slug = :slug WHERE id = :id`,
        {
          replacements: { slug, id: post.id }
        }
      );
    }
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(
      `UPDATE posts SET slug = NULL`
    );
  }
};
