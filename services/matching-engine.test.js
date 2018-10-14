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
})