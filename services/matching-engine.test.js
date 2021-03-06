const matchingEngine = require('./matching-engine')

describe('Service: Matching Engine', () => {
  describe('#getBook', () => {
    let result
  
    beforeAll(() => {
      result = matchingEngine.getBook()
    })

    it('should return a the book', () => {
      expect(result).toEqual({
        buys: [],
        sells: []
      })
    })
  })

  describe('#clearBook', () => {
    let result
  
    beforeAll(() => {
      matchingEngine.buy(10, 9.5)
      matchingEngine.sell(5, 5.5)
      matchingEngine.clearBook()
      result = matchingEngine.getBook()
    })

    it('should return an empty book', () => {
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

      afterAll(() => {
        matchingEngine.clearBook()
      })

      it('should add the buy to the book', () => {
        expect(book).toEqual({
          buys: [ { quantity: 10, price: 9.5 } ],
          sells: []
        })
      })
    })

    describe('when adding multiple buys', () => {
      let book
  
      beforeAll(() => {
        matchingEngine.buy(10, 5)
        matchingEngine.buy(10, 15)
        matchingEngine.buy(10, 10)
        book = matchingEngine.getBook()
      })

      afterAll(() => {
        matchingEngine.clearBook()
      })

      it('should sort the buys by price descending', () => {
        expect(book).toEqual({
          buys: [
            { quantity: 10, price: 15 },
            { quantity: 10, price: 10 },
            { quantity: 10, price: 5 }
          ],
          sells: []
        })
      })
    })

    describe('when adding a buy with qualified sells', () => {
      let book
  
      beforeAll(() => {
        matchingEngine.sell(5, 10)
        matchingEngine.sell(1, 9)
        matchingEngine.buy(4, 10)
        book = matchingEngine.getBook()
      })

      afterAll(() => {
        matchingEngine.clearBook()
      })

      it('should buy the qualified sells starting with the lowest price first', () => {
        expect(book).toEqual({
          buys: [],
          sells: [
            { quantity: 2, price: 10 }
          ]
        })
      })
    })
  })

  describe('#sell', () => {
    describe('when the book is empty', () => {
      let book
  
      beforeAll(() => {
        matchingEngine.sell(10, 9.5)
        book = matchingEngine.getBook()
      })

      afterAll(() => {
        matchingEngine.clearBook()
      })

      it('should add the sell to the book', () => {
        expect(book).toEqual({
          buys: [],
          sells: [ { quantity: 10, price: 9.5 } ]
        })
      })
    })

    describe('when adding multiple sells', () => {
      let book
  
      beforeAll(() => {
        matchingEngine.sell(10, 10)
        matchingEngine.sell(10, 5)
        matchingEngine.sell(10, 15)
        book = matchingEngine.getBook()
      })

      afterAll(() => {
        matchingEngine.clearBook()
      })

      it('should sort the sells by price ascending', () => {
        expect(book).toEqual({
          buys: [],
          sells: [
            { quantity: 10, price: 5 },
            { quantity: 10, price: 10 },
            { quantity: 10, price: 15 }
          ]
        })
      })
    })

    describe('when adding a sell with qualified buys', () => {
      let book
  
      beforeAll(() => {
        matchingEngine.buy(5, 10)
        matchingEngine.buy(1, 9)
        matchingEngine.sell(4, 9)
        book = matchingEngine.getBook()
      })

      afterAll(() => {
        matchingEngine.clearBook()
      })

      it('should sell to the qualified buys executing at the highest price first', () => {
        expect(book).toEqual({
          buys: [
            { quantity: 1, price: 10 },
            { quantity: 1, price: 9 }
          ],
          sells: []
        })
      })
    })
  })
})