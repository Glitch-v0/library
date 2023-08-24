let body = document.body
let newBookForm = document.querySelector('form')
let myLibrary = []

/* Prototype book object */
function Book(title, author, pages, read){
  //the constructor
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}


function addBookToLibrary(...args) {
  // do stuff here
  for(let book of args){
    myLibrary.push(book)}
}

function removeBook(book) {
  let index = myLibrary.indexOf(book);
  
  if (index !== -1) {
    myLibrary.splice(index, 1); // Remove the book from the array
    displayBooks(); // Update the display
  }
}

function displayBooks(){
  // Remove the existing table if it exists
  let existingTable = document.querySelector('table');
  if (existingTable) {
    existingTable.remove();
  }
  let table = document.createElement('table')
  let headerRow = table.insertRow()
  headerRow.innerHTML = "<th>Title</th><th>Author</th><th>Pages</th><th>Read</th>";
  for(let book of myLibrary){
    let row = table.insertRow()

    // Add cells to the row
    let titleCell = row.insertCell()
    let authorCell = row.insertCell()
    let pagesCell = row.insertCell()
    let readCell = row.insertCell()
    readCell.className = "readCell";

     // Populate the cells with book information
     titleCell.textContent = book.title
     authorCell.textContent = book.author
     pagesCell.textContent = book.pages
     readCell.textContent = book.read ? "Read" : "Not read"
     
     // Create a checkbox element
    var checkbox = document.createElement("INPUT");
    checkbox.type = "checkbox";
    checkbox.checked = book.read; // Set the checked attribute based on the book's read property
    checkbox.dataset.index = myLibrary.indexOf(book); // Set the data-index attribute to the index of the book object in the array
    readCell.appendChild(checkbox);

    // Add an event listener to the checkbox
    checkbox.addEventListener("click", function() {
      var index = this.dataset.index; // Get the index of the book object from the data-index attribute
      var book = myLibrary[index]; // Get the book object from the array using the index
      book.read = this.checked; // Update the book's read property based on the checkbox's checked attribute
      console.log(`${book.title}: ${book.read}`)
      readCell.textContent = book.read ? "Read" : "Not read"
      readCell.appendChild(this);
  });

     // Create a cell for the remove button
    let removeCell = row.insertCell();
    let removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.addEventListener('click', () => {
      removeBook(book); // Call a function to remove the book from the library and update the display
    });
    removeCell.appendChild(removeButton);
  }
  // Footer row for the "Add a new book!" button
  let footerRow = table.insertRow();
  let footerCell = footerRow.insertCell();
  footerCell.colSpan = 5; // Span across all columns
  footerCell.style.backgroundColor = "#AFFFFF"

  let addButton = document.createElement('button');
  addButton.textContent = "Add a new book!";
  addButton.style.backgroundColor = "#FFFFFF"
  addButton.addEventListener('click', () => {
    newBookForm.hidden = false
  });

  footerCell.appendChild(addButton);
  body.appendChild(table)
  }

const theHobbit = new Book("The Hobbit", "J.R.R Tolkein", 295, false)
const theBible = new Book("The Bible", "Multiple*", 1504, true)
const sorcerersStone = new Book("Harry Potter: Sorcerer's Stone", "J.K. Rowling", 350, true)
addBookToLibrary(theHobbit, theBible, sorcerersStone)
displayBooks()

// Add an event listener to the submit button
newBookForm.addEventListener("submit", function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the input fields by their id
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var pages = document.getElementById("pages").value;
  var read = document.getElementById("read").checked;

  // Do something with the values, such as displaying them on the screen or sending them to a server
  addBookToLibrary(new Book(title, author, pages, read));
  displayBooks();
  console.log(myLibrary)
});