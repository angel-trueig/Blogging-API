class Blog {
    constructor(title, content, category) {
        this.id = Date.now();
        this.title = title;
        this.content = content;
        this.category = category;
        this.likes = 0;
    }
};

function like() {
    this.like++;
}

module.exports = Blog;