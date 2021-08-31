// Test books for Library display formatting
const book1 = new Book("The Obstacle is the Way", "Ryan Holiday", 391, true)
const book2 = new Book("The Witcher", "Andrej Sapkowski", 400,true)
const book3 = new Book("The Bible", "Various", 1200, false)

const addBookForm = document.getElementById("bookForm")
const library = document.getElementById("library")

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.changeStatus = function () {
    if (this.read === true) {
        return this.read = false
    } else if (this.read === false) {
        return this.read = true
    }
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
        let pageCount = document.createElement("p")


        // Add remove Btn to HTML and assign Array index to data attr.
        displayRemoveBtn(bookDiv)
        bookDiv.setAttribute("data", `${myLibrary.indexOf(myLibrary[i])}`)

        // Add Book Obj. to HTML
        library.appendChild(bookDiv).classList.add("book")
        bookDiv.appendChild(title).textContent = myLibrary[i].title
        bookDiv.appendChild(hLine)
        bookDiv.appendChild(author).textContent = myLibrary[i].author
        bookDiv.appendChild(pageCount).textContent = `${myLibrary[i].pages} pages`

        //Creates Toggle Button Element
        createToggle(bookDiv, i)
    }
}

function createToggle(book, i) {
    let switchContainer = document.createElement("div")
    let switchBtn = document.createElement("div")
    switchContainer.classList.add("switch-container")
    // Change Red Status of book in HTML
    if (myLibrary[parseInt(i)].read === true) {
        book.appendChild(switchContainer)
        switchContainer.textContent = "Read"
        switchContainer.appendChild(switchBtn).classList.add("switch", "read")
    } else {
        switchContainer.textContent = "Not Read"
        book.appendChild(switchContainer)
        switchContainer.appendChild(switchBtn).classList.add("switch", "not-read")
    }
    //TODO: Change label of read to reflect status dynamically
    // Changes status of book in DOM
    switchBtn.addEventListener("click", (e) => changeNode(e))
    switchBtn.addEventListener("click", () => {
        if (switchBtn.classList.contains("read")) {
            switchBtn.classList.remove("read")
            switchBtn.classList.add("not-read")
        } else {
            switchBtn.classList.remove("not-read")
            switchBtn.classList.add("read")
        }
    })
}

function changeNode(e) {
    let childNode = e.target.parentNode
    let targetNode = childNode.parentNode
    let index = targetNode.getAttribute("data")
    return myLibrary[parseInt(index)].changeStatus()
}

function displayRemoveBtn(book) {
    let iconContainer = document.createElement("span")
    let removeBtn = document.createElement("img")

    // Add svg 'X' btn
    removeBtn.src = "./assets/svg/close_black_24dp.svg"

    book.appendChild(iconContainer).classList.add("remove-book")
    iconContainer.appendChild(removeBtn)
    removeBtn.addEventListener("click", (e) => removeData(e))
}

function removeData(e) {
    let targetRemove = e.target.closest("div")
    let index = targetRemove.getAttribute("data")

    targetRemove.remove()
    myLibrary.splice(parseInt(index), 1)
}


