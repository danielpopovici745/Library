const myLibrary = [];
const tableBody = document.querySelector(".tableBody");
document.querySelector(".addBookButton").onclick = addBookToLibrary;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.toggleRead = function(checkbox) {
    if (checkbox.checked) {
      this.read = true;
    } else {
      this.read = false;
    }
  }
}

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

    const bookRead = document.querySelector("#formCompleted").checked;
    const book = new Book(
      bookFormArrayValues[0],
      bookFormArrayValues[1],
      bookFormArrayValues[2],
      bookRead
    );
    // send book object to users library array for storage and then will be added to the table for the user to view
    myLibrary.push(book);
    updateTable();
  }
}

function updateTable() {
  clearTable();
  // this function goes through each value in each object in myLibrary and displays it in a table.
  myLibrary.forEach((book) => {
    const row = tableBody.insertRow(-1);
    const arrayBookValues = Object.values(book);
    for (let index = 0; index < 3; index += 1) {
      const cell = row.insertCell();
      cell.appendChild(document.createTextNode(arrayBookValues[index]));
    }
    addCompletedCheckbox(row, myLibrary.indexOf(book));
    addRemoveBookButton(row, myLibrary.indexOf(book));
  });
}

function addRemoveBookButton(row, index) {
  const cell = row.insertCell();
  const removeButton = document.createElement("button");
  removeButton.setAttribute("data-BookID", index);
  removeButton.textContent = "Remove";
  // calls removeBook and passes into it the data attribute of the button that was pressed
  removeButton.addEventListener("click", () => {
    removeBook(removeButton.getAttribute("data-BookID"));
  });
  // appends the button to the new cell created in the row
  cell.appendChild(removeButton);
}

function addCompletedCheckbox(row, index) {
  const completedCheckbox = document.createElement("input");
  completedCheckbox.type = "checkbox";
  completedCheckbox.id = "completed";
  completedCheckbox.name = "completed";
  if (myLibrary[index].read) {
    completedCheckbox.checked = true;
  }
  completedCheckbox.setAttribute("data-BookID", index);
  completedCheckbox.addEventListener("click", () => {
    myLibrary[completedCheckbox.getAttribute("data-BookID")].toggleRead(completedCheckbox);
  });
  const cell = row.insertCell();
  cell.appendChild(completedCheckbox);
}

function removeBook(index) {
  // removes the book using its index from myLibrary
  myLibrary.splice(index, 1);
  updateTable();
}
function clearTable() {
  const numOfRows = tableBody.querySelectorAll("tr").length;
  // deletes each row in table body using its index
  for (let index = numOfRows - 1; index >= 0; index -= 1) {
    tableBody.deleteRow(index);
  }
}
