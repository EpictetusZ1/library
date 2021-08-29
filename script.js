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

const addBookForm = document.getElementById("bookForm")

function addBookToLibrary(e) {
    e.preventDefault()
    let bookData = Object.fromEntries(new FormData(addBookForm))
    let testData = new Map(Object.entries(bookData))
    let newBook = new Book(...testData.values())
    myLibrary.push(newBook)
    addBookForm.reset()
}

addBookForm.addEventListener("submit", (e) => {
    addBookToLibrary(e)
})
