const findAuthorById = (authors, id) => authors.find(author => author.id === id);

const findBookById = (books, id) => books.find(book => book.id === id)

function partitionBooksByBorrowedStatus1(books) {
  let array1 = []
  let array2 = []
  let result = []
  //if books.borrows.returned === false result.push(to the first array)
  for (let book of books) {
    for (let borrow of book.borrows) {
    if (borrow.returned === false) {
      array1.push(book)
      } else {
        array2.push(book)
      }
    }
  }
  console.log("array1 "+array1)
  console.log("array2 "+array2)
  result.push(array1)
  result.push(array2)
  console.log("result "+result)
  ///if books.borrows.returned === true result.push(to the second array)
  return result
}

function partitionBooksByBorrowedStatus(books) {
  return books.reduce((acc, book) => {
    const [borrowed, returned] = acc
    const recent = book.borrows[0]
    if (recent.returned) returned.push(book)
    else borrowed.push(book)
    return acc
  }, [[], []])
}

function getBorrowersForBook(book, accounts) {
  //iterate over the accounts array to pull ids 
  const idsByAccount = accounts.reduce((acc, account) => {
    acc[account.id] = account
    return acc
  }, {})
  //look at borrows to match account ids
  return book.borrows.map(({id, returned}) => ({
    ...idsByAccount[id],
    returned
  }))
  .slice(0, 10)
  //return the first 10
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
