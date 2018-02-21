const GB = require('../helpers/Gameboard')
const Tile = require('../helpers/Tile')
/**
 * Imports the lodash library
 */
const _ = require('lodash')

describe('Gameboard tests', () => {
  it('Gameboard should be created', () => {
    expect(new GB(15)).toBeTruthy()
  })

  it('Gameboard should be initialized', () => {
    const g = new GB(15)

    g.init()

    expect(g.initialized).toBe(true)
  })

  it('Gameboard should not be re-initialized', () => {
    const g = new GB(15)

    g.init()

    expect(g.init()).toBe(true)
  })

  it('Gameboard size should be 15', () => {
    const g = new GB(15)

    expect(g.size).toBe(15)
  })

  it('Gameboard should place word "OSWEGO" horizontally from (2,2) to (7, 2)', () => {
    const g = new GB(15)

    g.init()

    const word = 'OSWEGO'
    const startX = 2
    const startY = 2
    const endX = 7
    const endY = 2

    g.placeWord({ x: startX, y: startY }, { x: endX, y: endY }, word)

    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        expect(g.board[j][i].letter.toUpperCase()).toEqual(word[i - startX].toUpperCase())
      }
    }
  })

  it('Gameboard should place word "OSWEGO" vertically from (2,2) to (2, 7)', () => {
    const g = new GB(15)

    g.init()

    const word = 'OSWEGO'
    const startX = 2
    const endX = 2
    const startY = 2
    const endY = 7

    g.placeWord({ x: startX, y: startY }, { x: endX, y: endY }, word)

    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        expect(g.board[j][i].letter.toUpperCase()).toEqual(word[j - startY].toUpperCase())
      }
    }
  })

  it('Gameboard should not place a horizontal word in the cross section of a vertical word', () => {
    const g = new GB(15)

    g.init()

    // Vertical Word
    const word = 'OSWEGO'
    const startX = 2
    const startY = 2
    const endX = 2
    const endY = 7

    const word2 = 'BAD'
    const startX2 = 1
    const startY2 = 5
    const endX2 = 3
    const endY2 = 5

    g.placeWord({ x: startX, y: startY }, { x: endX, y: endY }, word)
    const validBoard = _.cloneDeep(g.board)
    g.placeWord({ x: startX2, y: startY2 }, { x: endX2, y: endY2 }, word2)

    for (let i = 0; i < g.board.length; i++) {
      for (let j = 0; j < g.board[0].length; j++) {
        expect(g.board[j][i].letter.toUpperCase()).toEqual(validBoard[j][i].letter.toUpperCase())
      }
    }
  })

  it('Gameboard should place a horizontal word in the cross section of a vertical word', () => {
    const g = new GB(15)

    g.init()

    // Vertical Word
    const word = 'OSWEGO'
    const startX = 2
    const startY = 2
    const endX = 2
    const endY = 7

    const word2 = 'BED'
    const startX2 = 1
    const startY2 = 5
    const endX2 = 3
    const endY2 = 5

    g.placeWord({ x: startX, y: startY }, { x: endX, y: endY }, word)
    g.placeWord({ x: startX2, y: startY2 }, { x: endX2, y: endY2 }, word2)

    for (let i = startX2; i <= endX2; i++) {
      for (let j = startY2; j <= endY2; j++) {
        expect(g.board[j][i].letter.toUpperCase()).toEqual(word2[i - startX2])
      }
    }
  })
})

describe('Tile tests', () => {
  it('Tile should be created', () => {
    const tile = new Tile(1, 1, '0')

    expect(tile).toBeTruthy()
  })

  it('Tile should be at x = 1', () => {
    const tile = new Tile(1, 1, '0')

    expect(tile.x).toBe(1)
  })

  it('Tile should be at y = 1', () => {
    const tile = new Tile(1, 1, '0')

    expect(tile.y).toBe(1)
  })

  it('Tile should be have a multiplier of 2W', () => {
    const tile = new Tile(1, 1, '2W')

    expect(tile.multiplier).toBe('2W')
  })

  it('Tile should be the letter "Q"', () => {
    const tile = new Tile(1, 1, '0')

    tile.letter = 'Q'

    expect(tile.letter).toBe('Q')
  })

  it('Tile should have a letter placed', () => {
    const tile = new Tile(1, 1, '0')

    tile.letter = 'Q'

    expect(tile.letterPlaced).toBe(true)
  })

  it('Tile should not have a letter placed', () => {
    const tile = new Tile(1, 1, '0')

    expect(tile.letterPlaced).toBe(false)
  })
})
