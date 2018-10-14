const inMemoryBook = {
  buys: [],
  sells: []
}

function getBook() {
  return inMemoryBook
}

function buy(quality, price) {
  return true
}

function sell(quality, price) {
  return true
}

module.exports = {
  getBook,
  buy,
  sell
}