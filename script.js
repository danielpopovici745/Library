const myLibrary = [];
const table = document.querySelector(".library");
const addBookForm = document.querySelectorAll(".addBookForm input");
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
  const bookFormArrayValues = Array.from(addBookForm).map(
    (input) => input.value
  );
  const book = new Book(
    bookFormArrayValues[0],
    bookFormArrayValues[1],
    bookFormArrayValues[2],
    bookFormArrayValues[3]
  );
  myLibrary.push(book);
}
