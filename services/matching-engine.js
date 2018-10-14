let inMemoryBook

clearBook()

function clearBook() {
  inMemoryBook = {
    buys: [],
    sells: []
  }
}

function getBook() {
  return inMemoryBook
}

function buy(quantity, price) {
  inMemoryBook.buys.push({ quantity, price })
  inMemoryBook.buys.sort((a, b) => a.price < b.price)
}

function sell(quantity, price) {
  inMemoryBook.sells.push({ quantity, price })
}

module.exports = {
  clearBook,
  getBook,
  buy,
  sell
}