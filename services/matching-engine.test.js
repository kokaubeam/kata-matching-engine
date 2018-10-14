const matchingEngine = require('./matching-engine')

describe('Service: Matching Engine', () => {
  describe('#getBook', () => {
    let result
  
    beforeAll(() => {
      result = matchingEngine.getBook()
    })

    it('should return a structured result', () => {
      expect(result).toEqual({
        buys: [],
        sells: []
      })
    })
  })

  describe('#buy', () => {
    describe('when the book is empty', () => {
      let book
  
      beforeAll(() => {
        matchingEngine.buy(10, 9.5)
        book = matchingEngine.getBook()
      })

      it('should add the buy to the book', () => {
        expect(book).toEqual({
          buys: [ { quantity: 10, price: 9.5 } ],
          sells: []
        })
      })
    })
  })

  describe('#sell', () => {
    let result
  
    beforeAll(() => {
      result = matchingEngine.sell()
    })

    it('should return true', () => {
      expect(result).toEqual(true)
    })
  })
})