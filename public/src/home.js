const getTotalBooksCount = books => books.length


const getTotalAccountsCount = accounts => accounts.length

//works, but not ran. Less efficient.
function getBooksBorrowedCount1(books) {
  let total = 0
  for (let book of books) {
    for (let borrowed of book.borrows)
      if (borrowed.returned === false)
        total++
  }
  return total
}

//works and ran. More efficiant
function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    return !book.borrows[0].returned ? acc+1 : acc;
  }, 0)
}

function getMostCommonGenres(books) {
  const count = books.reduce((acc, {genre}) => {
    if (!acc[genre]) {
      acc[genre] =1
    } else {
      acc[genre] += 1
    }
    return acc;
  }, {})
  const  sortedGenres = _objectSortedValues(count);
  return sortedGenres.map((name) => ({
    name, count: count[name]
  })).slice(0, 5)
}

//helper function
function _objectSortedValues(obj) {
   const keys = Object.keys(obj);
   return keys.sort((keyA, keyB) => {
     if(obj[keyA] > obj[keyB]) {
       return -1;
     } else if(obj[keyB] > obj[keyA]) {
       return 1;
     } else {
       return 0;
     }
   })
 }

function getMostPopularBooks(books) {
  const groupById = books.reduce((acc, book) => {
    acc[book.id] = book.borrows.length;
    return acc;
  }, {});
  const keys = Object.keys(groupById);
  let sorted = keys.sort((keyA, keyB) => {
    if (groupById[keyA] > groupById[keyB]) {
      return -1;
    } else if (groupById[keyB] > groupById[keyA]) {
      return 1;
    }
    return 0;
  })
  let newArr = sorted.map((id) => {
    let book = books.find(book => book.id === id);
    let count = groupById[id];
    return {name: book.title, count: count};
  })
  return newArr.slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  // iterate over books to look at "authorId, borrows" to count
  const count = books.reduce((acc, { authorId, borrows }) => {
    if (acc[authorId]) {
      acc[authorId].push(borrows.length);
    } else {
      acc[authorId] = [borrows.length]
    }
    return acc;
  }, {})
  console.log("count: ", count)
  // push authorId w/ borrows.length

  // iterate over "count variable"
  for (let id in count) {
    const sum = count[id].reduce((aaa, bbb) => aaa + bbb); 
    count[id] = sum
  }
    //add up sum of author[id]
  // sort obj
  const sorted = _objectSortedValues(count)
  console.log("sorted ", sorted)
  // iterate sorted obj and build out obj
  let result = []; 
  for (let currentId of sorted) {
    let currentAuthor = authors.find((author) => author.id == currentId)
    let tempName = {
      name: `${currentAuthor.name.first} ${currentAuthor.name.last}`,
      count: count[currentId] }
      result.push(tempName)
    }
    console.log("result: "+result.slice(0, 5))
    return result.slice(0, 5)
  }

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
