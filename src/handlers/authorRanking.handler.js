import Post from "../db/models/post.js";

export const getAuthorRanking = async () => {

    const posts = await Post.findAll({
        where: {
            status: "active",
        },
        attributes: [
            "author_id",
            "like_count",
            "comments_count",
            "view_count",
        ],
        raw: true,
    });

    const authorRankingMap = posts.reduce((acc, post) => {
        const authorId = post.author_id;

        if (!acc[authorId]) {
            acc[authorId] = {
                author_id: authorId,
                like_count: 0,
                comments_count: 0,
                view_count: 0,
                score: 0,
            };
        }

        acc[authorId].like_count += post.like_count;
        acc[authorId].comments_count += post.comments_count;
        acc[authorId].view_count += post.view_count;

        return acc;
    }, {});
    const rankedAuthors = Object.values(authorRankingMap).map((author) => {
        author.score =
            author.like_count +
            author.comments_count +
            author.view_count;

        return author;
    });
    rankedAuthors.sort((a, b) => b.score - a.score);

    return rankedAuthors;
};
