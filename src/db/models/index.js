import sequelize from '../../config/database.config.js';
import User from './user.js';
import Post from './post.js';
import Comment from './comment.js';
import Like from './like.js';

const models = {
  User,
  Post,
  Comment,
  Like
};

const initDb = async () => {
  try {
    // Initialize models
    Object.values(models).forEach(model => {
      if (model.initModel) {
        model.initModel(sequelize);
      }
    });

    // Set up associations
    Object.values(models).forEach(model => {
      if (model.associate) {
        model.associate(models);
      }
    });

    await sequelize.authenticate();
    console.log('✅ Database connected successfully.');
    console.log('✅ Models initialized:', Object.keys(models));

    return {
      sequelize,
      ...models
    };
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

export default initDb;
