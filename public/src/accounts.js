function findAccountById(accounts, id) {
  let found = accounts.find((account) => account.id === id);
  return found;
}

function sortAccountsByLastName(accounts) {
  let sorted = accounts.sort((account1, account2) =>
    account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1
  );
  return sorted;
}

function getTotalNumberOfBorrows(account, books) {
  let totalBorrows = 0;
  for (let book of books) {
    let arrayOfId = book.borrows.map((borrow) => borrow.id);
    for (i = 0; i < arrayOfId.length; i++) {
      if (arrayOfId[i] === account.id) totalBorrows++;
    }
  }
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  let accountId = account.id;
  let bookCheckouts = books.filter((book) => book.borrows[0].id === accountId);
  for (let i = 0; i < bookCheckouts.length; i++) {
    bookCheckouts[i].author = authors.find(
      (author) => bookCheckouts[i].authorId === author.id
    );
  }
  return bookCheckouts;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
