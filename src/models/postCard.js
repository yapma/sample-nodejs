function PostCard(name, description, category) {  
    this.name = name || null;
    this.description = description || null;
    this.category = category || null;
}

module.exports = PostCard;