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
  for (var sell of inMemoryBook.sells) {
    if (sell.price > price) {
      break;
    }

    if (sell.quantity >= quantity) {
      sell.quantity -= quantity
      quantity = 0
      break;
    }

    quantity -= sell.quantity
    sell.quantity = 0
  }

  inMemoryBook.sells = inMemoryBook.sells.filter(sell => sell.quantity > 0)

  if (quantity > 0) {
    inMemoryBook.buys.push({ quantity, price })
    inMemoryBook.buys.sort((a, b) => a.price < b.price)
  }
}

function sell(quantity, price) {
  for (var buy of inMemoryBook.buys) {
    if (buy.price < price) {
      break;
    }

    if (buy.quantity >= quantity) {
      buy.quantity -= quantity
      quantity = 0
      break;
    }

    quantity -= buy.quantity
    buy.quantity = 0
  }

  inMemoryBook.buys = inMemoryBook.buys.filter(buy => buy.quantity > 0)

  if (quantity > 0) {
    inMemoryBook.sells.push({ quantity, price })
    inMemoryBook.sells.sort((a, b) => a.price > b.price)
  }
}

module.exports = {
  clearBook,
  getBook,
  buy,
  sell
}