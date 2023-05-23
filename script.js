const myLibrary = [];
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
    addBookToTable();
  }
}

function addBookToTable() {
  const addedBook = myLibrary[myLibrary.length - 1];
  const row = tableBody.insertRow(-1);
  Object.values(addedBook).forEach((value) => {
    const td = row.insertCell();
    td.appendChild(document.createTextNode(value));
  });
}
