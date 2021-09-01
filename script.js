const addBookForm = document.getElementById("bookForm")
const library = document.getElementById("library")

const useLocalBtn = document.getElementById("local-storage-btn")
const stopLocalBtn = document.getElementById("stop-local-storage")

let myLibrary = []
let useLocalStorage = false
let bookCounter = 0

function Book(title, author, pages, read, displayed) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.displayed = displayed
}

Book.prototype.changeStatus = function () { // Updates 'read' status of book
    if (this.read === true) {
        return this.read = false
    } else if (this.read === false) {
        return this.read = true
    }
}

Book.prototype.evalRead = function () { // Converts str. to bool
    this.read = this.read === "1";
}

Book.prototype.isDisplayed = function () {
    if (!this.displayed) {
        return this.displayed = true
    }
}

addBookForm.addEventListener("submit", (e) => addBookToLibrary(e))

function addBookToLibrary(e) {
    e.preventDefault()
    let newBook = new Book(...new FormData(addBookForm).values())
    newBook.evalRead()
    myLibrary.push(newBook)
    if (useLocalStorage) {
        storeLocally(newBook)
    }
    addBookForm.reset()
    displayBook()
}

function displayBook() {
    for (let i = 0; i < myLibrary.length; i++) {
        if (!myLibrary[i].displayed) {
            // Check if book is already displayed
            myLibrary[i].isDisplayed()

            // Define HTML book elements
            let bookDiv = document.createElement("div")
            let title = document.createElement("h3")
            let hLine = document.createElement("hr")
            let author = document.createElement("h4")
            let pageCount = document.createElement("p")

            // Add remove Btn to HTML and assign Array[i] to data attribute
            displayRemoveBtn(bookDiv)
            bookDiv.setAttribute("data", `${myLibrary.indexOf(myLibrary[i])}`)

            // Add Book content to HTML
            library.appendChild(bookDiv).classList.add("book")
            bookDiv.appendChild(title).textContent = myLibrary[i].title
            bookDiv.appendChild(hLine)
            bookDiv.appendChild(author).textContent = myLibrary[i].author
            bookDiv.appendChild(pageCount).textContent = `${myLibrary[i].pages} pages`

            //Creates Toggle Button Element for Book.read
            createToggle(bookDiv, i)
        }
    }
}

function createToggle(book, i) {
    let switchContainer = document.createElement("div")
    let switchBtn = document.createElement("div")
    switchContainer.classList.add("switch-container")
    book.appendChild(switchContainer)
    switchContainer.textContent = "Read:"

    // Change Read Status of book in HTML
    if (myLibrary[i].read === true) {
        switchBtn.innerText = "✓"
        switchContainer.appendChild(switchBtn).classList.add("switch", "read")
    } else {
        switchBtn.innerText = "✕"
        switchContainer.appendChild(switchBtn).classList.add("switch")
    }
    // Changes status of book in DOM
    switchBtn.addEventListener("click", (e) => changeNodeStatus(e))
    switchBtn.addEventListener("click", () => switchBtn.classList.toggle("read"))
    switchBtn.addEventListener("click", () => {
        if (myLibrary[i].read === true) {
        switchBtn.innerText = "✕"
        } else {
            switchBtn.innerText = "✓"
        }
    }, {
        capture: true
    })
}

function changeNodeStatus(e) {
    // Targets 'grandparent' of the toggle btn - the book div w/ data attribute assigned to it
    let childNode = e.target.parentNode
    let targetNode = childNode.parentNode
    let index = parseInt(targetNode.getAttribute("data"))
    return myLibrary[index].changeStatus()
}

function displayRemoveBtn(book) {
    let iconContainer = document.createElement("span")
    let removeBtn = document.createElement("img")

    removeBtn.src = "./assets/svg/close_black_24dp.svg"
    book.appendChild(iconContainer).classList.add("remove-book")
    iconContainer.appendChild(removeBtn)
    removeBtn.addEventListener("click", (e) => removeData(e))
}

// Remove book data from DOM/ myLibrary variable
function removeData(e) {
    let targetRemove = e.target.closest("div")
    let index = parseInt(targetRemove.getAttribute("data"))
    if (localStorage) {
        // Removes book from local storage
        localStorage.removeItem(`book${myLibrary.indexOf(myLibrary[index])}`)
    }
    targetRemove.remove()
    myLibrary.splice(index, 1)
    updateDataAttr()
}

function updateDataAttr() {
    let htmlBooks = document.querySelectorAll(".book")
    for (let i = 0; i < htmlBooks.length; i ++) {
        htmlBooks[i].setAttribute("data", i.toString())
    }
}

function storeLocally(book) {
    localStorage.setItem(`book${bookCounter}`, JSON.stringify(book))
    bookCounter++
}

function getLocalStorage() {
    if (useLocalStorage) {
        let length = localStorage.length
        for (let i = 0; i < length; i++) {
            let newBook = new Book(0, 0, 0, 0, false)

            // Populate Book obj. from JSON data
            let addBook = JSON.parse(localStorage.getItem(`book${i}`))
            let yieldBook = Object.assign(newBook, addBook)
            myLibrary.push(yieldBook)
        }
    }
}

// Handles the INITIAL instance of a user deciding to use Local storage
useLocalBtn.addEventListener("click", (e) => {
    let result
    result = e.target.toggleAttribute("useLocal")
    useLocalStorage = result;
})

// Add color to BTN to alert user of storage status
useLocalBtn.addEventListener("click", (e) => e.target.classList.toggle("use-local-true"))

stopLocalBtn.addEventListener("click",(e) => e.target.classList.toggle("use-local-false"))

// Stops local storage and clears data
stopLocalBtn.addEventListener("click", () => {
    useLocalStorage = false
    localStorage.clear()
    window.location.reload()
})

window.onload = function () {
    if (localStorage.length > 0) {
        useLocalStorage = true
        getLocalStorage()
        displayBook()
    }
}