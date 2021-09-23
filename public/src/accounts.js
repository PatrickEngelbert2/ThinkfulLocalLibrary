const findAccountById = (accounts, id) => accounts.find(account => account.id === id);

const sortAccountsByLastName = (accounts) => accounts.sort((accA, accB) => accA.name.last.toLowerCase() > accB.name.last.toLowerCase() ? 1 : -1)

//not ran but works
function getTotalNumberOfBorrows1(account, books) {
  let id = account.id;
  let total = 0;
  for (let book of books) {
    let borrows = book.borrows;
    for (let borrow of borrows) {
    if (borrow.id === id) {
      total++
      }
    }
  }
  return total
}

//ran, works, and simpler
function getTotalNumberOfBorrows(account, books) {
  return books.reduce((acc, book) => {
    const count = book.borrows.reduce((borrowAcc, borrow) => {
      return borrow.id === account.id ? borrowAcc + 1 : borrowAcc;
    }, 0);

    return acc + count;
  }, 0);
}

//not ran, but works
function getBooksPossessedByAccount1(account, books, authors) {
  let checkedOutBooks = []
  //if book is checked out, push book and nest author into checkedOutBooks
  for (let book of books) {
    for (let borrow of book.borrows) {
    if (borrow.id === account.id && borrow.returned === false) {
      checkedOutBooks.push(book)
      }
    }
  }
  for (let checkedOutBook of checkedOutBooks) {
    for (let author of authors) {
      if (checkedOutBook.authorId === author.id) {
        checkedOutBook.author = author;
      }
    }
  }
  return checkedOutBooks
}

//ran, works, and simpler
function getBooksPossessedByAccount(account, books, authors) {
  //itterate over books and look at borrows array. Check if recent id is === borrows id.
  return books.filter((book) => {
    const recent = book.borrows[0]
    return !recent.returned && recent.id === account.id
  })
  .map((book) => {
    const author = authors.find((author) => author.id === book.authorId)
    return {...book,author}
  })
  //itterate over that to get the authorId is the same as an authors id
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
