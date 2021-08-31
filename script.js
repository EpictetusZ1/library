// Test books for Library display formatting
const book1 = new Book("The Obstacle is the Way", "Ryan Holiday", 391, "Read")
const book2 = new Book("The Witcher", "Andrej Sapkowski", 400, "Read")
const book3 = new Book("The Bible", "Various", 1200, "Not Read")

const addBookForm = document.getElementById("bookForm")
const library = document.getElementById("library")

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.getInfo = function () {
    return `${this.title} By ${this.author}, ${this.pages} pages, ${this.read}`
}

let myLibrary = [book1, book2, book3]

function addBookToLibrary(e) {
    e.preventDefault()
    //TODO: Simplify this code
    let bookData = Object.fromEntries(new FormData(addBookForm)) //Creates new Obj.
    let testData = new Map(Object.entries(bookData)) // Converts Obj. to array
    let newBook = new Book(...testData.values()) // Converts Arr. to desired Book Obj.
    myLibrary.push(newBook)
    addBookForm.reset()
    displayBook()
}

addBookForm.addEventListener("submit", (e) => addBookToLibrary(e))

function displayBook() {
    for (let i = 0; i < myLibrary.length; i++) {
        // Define HTML book elements
        let bookDiv = document.createElement("div")
        let title = document.createElement("h3")
        let hLine = document.createElement("hr")
        let author = document.createElement("h4")
        let paragraph = document.createElement("p")

        // Add remove Btn to HTML
        displayRemoveBtn(bookDiv)
        bookDiv.setAttribute("data", `${myLibrary.indexOf(myLibrary[i])}`)

        // Add Book Obj. to HTML
        library.appendChild(bookDiv).classList.add("book")
        bookDiv.appendChild(title).textContent = myLibrary[i].title
        bookDiv.appendChild(hLine)
        bookDiv.appendChild(author).textContent = myLibrary[i].author
        bookDiv.appendChild(paragraph).textContent = myLibrary[i].pages
        bookDiv.appendChild(paragraph).textContent = `Status: ${myLibrary[i].read}`
    }
}

function displayRemoveBtn(book) {
    let iconContainer = document.createElement("span")
    let removeBtn = document.createElement("img")
    removeBtn.src = "./assets/svg/close_black_24dp.svg"
    book.appendChild(iconContainer)
    iconContainer.classList.add("remove-book")
    iconContainer.appendChild(removeBtn)
    removeBtn.addEventListener("click", (e) => removeData(e))
}

function removeData(e) {
    let targetRemove = e.target.closest("div")
    targetRemove.remove()
    let index = targetRemove.getAttribute("data")
    myLibrary.splice(parseInt(index), 1)
}

