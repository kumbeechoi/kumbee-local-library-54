function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = 0;
  for (let borrow in books) {
    if (!books[borrow].borrows[0].returned) {
      borrowedBooks++;
    }
  }
  return borrowedBooks;
}

function _sortObjectByValues(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    }
    return 0;
  });
}

function getMostCommonGenres(books) {
  let countObj = books.reduce((acc, { genre }) => {
    if (acc[genre]) {
      acc[genre] += 1;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  let sortedKeys = _sortObjectByValues(countObj);
  let sorted = sortedKeys
    .map((key) => ({ name: key, count: countObj[key] }))
    .slice(0, 5);
  return sorted;
}

function getMostPopularBooks(books) {
  let sortedObj = books.sort(function (a, b) {
    return b.borrows.length - a.borrows.length;
  });
  let topFive = sortedObj.slice(0, 5);
  let newArr = [];
  for (let i = 0; i < topFive.length; i++) {
    newArr.push({ name: topFive[i].title, count: topFive[i].borrows.length });
  }
  return newArr;
}

function getMostPopularAuthors(books, authors) {
  const authorList = books.reduce((acc, book) => {
    const { authorId, borrows } = book;
    const authorObj = authors.find((author) => author.id === authorId);
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    const count = borrows.length;
    const authorExists = acc.find((author) => author.name === name);
    if (authorExists) {
      authorExists.count += count;
    } else {
      const newAuthorEntry = { name, count};
      acc.push(newAuthorEntry);
    } return acc;
  }, []);
  const sortedAuthorNames = authorList.sort((a, b) => b.count - a.count);
  const topFive = sortedAuthorNames.slice(0, 5);
  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
