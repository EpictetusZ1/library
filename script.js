let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.getInfo = function () {
    return `${this.title} By ${this.author}, ${this.pages} pages, ${this.read}`
}

