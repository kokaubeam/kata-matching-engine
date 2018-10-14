const inMemoryBook = {
  buys: [],
  sells: []
}

function getBook() {
  return inMemoryBook
}

function buy(quantity, price) {
  inMemoryBook.buys.push({ quantity, price })
}

function sell(quantity, price) {
  return true
}

module.exports = {
  getBook,
  buy,
  sell
}