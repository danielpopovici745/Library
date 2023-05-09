const myLibrary = [];
const table = document.querySelector(".library");
document.querySelector(".addBookButton").onclick = addBookToLibrary;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`;
};

function addBookToLibrary() {
  const addBookFormInputs = document.querySelectorAll(".addBookForm input");
  const bookFormArrayValues = Array.from(addBookFormInputs).map(
    (input) => input.value
  );
  if (
    bookFormArrayValues.every(
      (value) => value != "" && value != undefined && value != null
    )
  ) {
    const book = new Book(
      bookFormArrayValues[0],
      bookFormArrayValues[1],
      bookFormArrayValues[2],
      bookFormArrayValues[3]
    );
    myLibrary.push(book);
    addBookToTable();
  }
}

function addBookToTable() {
  const addedBook = myLibrary[myLibrary.length - 1];
  const row = table.insertRow();
  Object.values(addedBook).forEach((value) => {
    const td = row.insertCell();
    td.appendChild(document.createTextNode(value));
  });
}
