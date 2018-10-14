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
    let result
  
    beforeAll(() => {
      result = matchingEngine.buy()
    })

    it('should return true', () => {
      expect(result).toEqual(true)
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