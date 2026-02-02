const buildCommentTree = (comments) => {
    const commentMap = new Map();
    const commentTree = [];

    comments.forEach(comment => {
        commentMap.set(comment.id, { ...comment, replies: [] });
    });
    comments.forEach(comment => {
        const current = commentMap.get(comment.id);

        if (comment.parent_id) {
            const parent = commentMap.get(comment.parent_id);
            if (parent) {
                parent.replies.push(current);
            }
        } else {
            commentTree.push(current);
        }
    });

    return commentTree;
};

export default buildCommentTree;
