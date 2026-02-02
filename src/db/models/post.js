import { Model, DataTypes } from "sequelize";
import { generateSlug } from "../../utils/slugify.js";

class Post extends Model {
    static initModel(sequelize) {
        Post.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            category: {
                type: DataTypes.ENUM(
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
            },

            author_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM('active', 'inactive'),
                allowNull: false,
                defaultValue: 'active'
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            comments_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        }, {
            sequelize,
            modelName: "Post",
            tableName: "posts",
            timestamps: false,
            hooks: {
                beforeValidate: async (post) => {
                    if (!post.slug && post.title) {
                        post.slug = await generateSlug(Post, post.title);
                    }
                }
            }
        });
    }

    static associate(models) {
        Post.belongsTo(models.User, { foreignKey: "author_id" });
        Post.hasMany(models.Comment, { foreignKey: "post_id" });
    }
};

export default Post;
