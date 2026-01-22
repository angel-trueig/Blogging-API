class Blog {
    constructor(title, content, category) {
        this.id = Date.now();
        this.title = title;
        this.content = content;
        this.category = category;

    }
};


module.exports = Blog;