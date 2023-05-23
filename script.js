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
  // const addedBook = myLibrary[myLibrary.length - 1];

  if (myLibrary.length > 1) {
    clearTable();
    myLibrary.forEach((book) => {
      const row = tableBody.insertRow(-1);
      const arrayBookValues = Object.values(book);
      arrayBookValues.forEach((value) => {
        const cell = row.insertCell();
        cell.appendChild(document.createTextNode(value));
      });
      addRemoveBookButton(row);
    });
  } else {
    const arrayBookValues = Object.values(myLibrary[0]);
    const row = tableBody.insertRow(-1);
    arrayBookValues.forEach((value) => {
      const cell = row.insertCell();
      cell.appendChild(document.createTextNode(value));
    });
    addRemoveBookButton(row);
  }
}

function addRemoveBookButton(row) {
  const cell = row.insertCell();
  const removeButton = document.createElement("button");
  removeButton.className = "removeButton";
  removeButton.setAttribute("data-BookID", myLibrary.length - 1);
  cell.appendChild(removeButton);
}
function clearTable() {
  const numOfRows = tableBody.querySelectorAll("tr").length;
  // deletes each row in table body using its index
  for (let index = numOfRows - 1; index >= 0; index -= 1) {
    tableBody.deleteRow(index);
  }
}
