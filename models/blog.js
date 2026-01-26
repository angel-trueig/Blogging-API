class Blog {
    constructor(title, content, category, authorId) {
        this.id = Date.now();
        this.title = title;
        this.content = content;
        this.category = category;
        this.authorId = authorId;

    }
};


module.exports = Blog;