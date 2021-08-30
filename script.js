// Test books for Library display formatting
const book1 = new Book("The Obstacle is the Way", "Ryan Holiday", 391, "Read")
const book2 = new Book("The Witcher", "Andrej Sapkowski", 400, "Read")
const book3 = new Book("The Bible", "Various", 1200, "Not Read")

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
const library = document.getElementById("library")

let myLibrary = [book1, book2, book3]

function addBookToLibrary(e) {
    e.preventDefault()
    let bookData = Object.fromEntries(new FormData(addBookForm))
    let testData = new Map(Object.entries(bookData))
    let newBook = new Book(...testData.values())
    myLibrary.push(newBook)
    addBookForm.reset()
    displayBook()
}

addBookForm.addEventListener("submit", (e) => addBookToLibrary(e))

function displayBook() {
    for (let i = 0; i < myLibrary.length; i ++) {
        let bookDiv = document.createElement("div")
        let title = document.createElement("h3")
        let author = document.createElement("h4")
        let paragraph = document.createElement("p")
        library.appendChild(bookDiv).classList.add("book")
        bookDiv.appendChild(title).textContent = myLibrary[i].title
        bookDiv.appendChild(author).textContent = "By: \r\n" + myLibrary[i].author
        bookDiv.appendChild(paragraph).textContent = myLibrary[i].pages
        bookDiv.appendChild(paragraph).textContent = myLibrary[i].read
    }
}