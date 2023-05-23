const myLibrary = [];
const table = document.querySelector(".library");
const tableBody = document.querySelector(".tableBody");
document.querySelector(".addBookButton").onclick = addBookToLibrary;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function info() {
  return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`;
};

function addBookToLibrary() {
  const addBookFormInputs = document.querySelectorAll(".addBookForm input");
  // converts NodeList to array with book data
  // ['title','author','pages','completed']
  const bookFormArrayValues = Array.from(addBookFormInputs).map(
    (input) => input.value
  );
  if (
    // checks to make sure book values are not empty,undefined or null
    bookFormArrayValues.every(
      (value) => value !== "" && value !== undefined && value !== null
    )
  ) {
    // create an object with the values from bookFormArrayValues
    const book = new Book(
      bookFormArrayValues[0],
      bookFormArrayValues[1],
      bookFormArrayValues[2],
      bookFormArrayValues[3]
    );
    // send book object to users library array for storage and then will be added to the table for the user to view
    myLibrary.push(book);
    updateTable();
  }
}

function updateTable() {
  clearTable();
  myLibrary.forEach((book) => {
    const row = tableBody.insertRow(-1);
    const arrayBookValues = Object.values(book);
    arrayBookValues.forEach((value) => {
      const cell = row.insertCell();
      cell.appendChild(document.createTextNode(value));
    });
    addRemoveBookButton(row, myLibrary.indexOf(book));
  });
}

function addRemoveBookButton(row, index) {
  const cell = row.insertCell();
  const removeButton = document.createElement("button");
  removeButton.setAttribute("data-BookID", index);
  removeButton.addEventListener("click", () => {
    removeBook(removeButton.getAttribute("data-BookID"));
  });
  cell.appendChild(removeButton);
}

function removeBook(BookID) {
  myLibrary.splice(BookID, 1);
  updateTable();
}
function clearTable() {
  const numOfRows = tableBody.querySelectorAll("tr").length;
  // deletes each row in table body using its index
  for (let index = numOfRows - 1; index >= 0; index -= 1) {
    tableBody.deleteRow(index);
  }
}
