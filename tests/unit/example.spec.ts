import Game from '@/services/game';

describe('return ordered pile and high card', () => {
  // it('User Input - Cards: 7D, AS, QH, 9S, 6D and Rotation Card: 2H', () => {
  //   const expectedOrderedPile = ['QH', '7D', '6D', 'AS', '9S'];
  //   const expectedHighCard = 'QH';
  //   const game = Game('2H', ['7D', 'AS', 'QH', '9S', '6D']);
  //   expect(expectedOrderedPile).toEqual(game.orderedPile);
  //   expect(expectedHighCard).toEqual(game.highCard);
  // });
  // it('User Input - Cards: 7D, AS, QH, 9S, 6D and Rotation Card: 10C', () => {
  //   const expectedOrderedPile = ['AS', '9S', 'QH', '7D', '6D'];
  //   const expectedHighCard = 'AS';
  //   const game = Game('10C', ['7D', 'AS', 'QH', '9S', '6D']);
  //   expect(expectedOrderedPile).toEqual(game.orderedPile);
  //   expect(expectedHighCard).toEqual(game.highCard);
  // });
  it('User Input - Cards: AS, AD, AC, KH, KS and Rotation Card: 2H', () => {
    const expectedOrderedPile = ['KH', 'AD', 'AC', 'AS', 'KS'];
    const expectedHighCard = 'KH';
    const expectedFullHouses = [
      ['AD', 'AC', 'AS', 'KH', 'KS']
    ];
    const expectedFullHousesOrdened = expectedFullHouses.map(e => e.sort()).sort();
    const game = Game('2H', ['AS', 'AD', 'AC', 'KH', 'KS']);
    expect(expectedOrderedPile).toEqual(game.orderedPile);
    expect(expectedHighCard).toEqual(game.highCard);
    expect(expectedFullHousesOrdened).toEqual(game.fullHouse.map(e => e.sort()).sort());
  });
  it('User Input - Cards:  2H, 2D, 2C, 2S, 3H, 3D, 3C and Rotation Card: 2H', () => {
    const expectedOrderedPile = ['2H', '3H', '2D', '3D', '2C', '3C', '2S'];
    const expectedHighCard = '2H';
    const expectedFullHouses = [
      ['2H', '2D', '2C', '3H', '3D'],
      ['2H', '2D', '2C', '3H', '3C'],
      ['2H', '2D', '2C', '3D', '3C'],
      ['2H', '2D', '2S', '3H', '3D'],
      ['2H', '2D', '2S', '3H', '3C'],
      ['2H', '2D', '2S', '3D', '3C'],
      ['2H', '2C', '2S', '3H', '3D'],
      ['2H', '2C', '2S', '3H', '3C'],
      ['2H', '2C', '2S', '3D', '3C'],
      ['2D', '2C', '2S', '3H', '3D'],
      ['2D', '2C', '2S', '3H', '3C'],
      ['2D', '2C', '2S', '3D', '3C'],
      ['2H', '2D', '3H', '3D', '3C'],
      ['2H', '2C', '3H', '3D', '3C'],
      ['2H', '2S', '3H', '3D', '3C'],
      ['2D', '2C', '3H', '3D', '3C'],
      ['2D', '2S', '3H', '3D', '3C'],
      ['2C', '2S', '3H', '3D', '3C'],
    ]

    const expectedFullHousesOrdened = expectedFullHouses.map(e => e.sort()).sort();

    const game = Game('2H', ['2H', '2D', '2C', '2S', '3H', '3D', '3C']);
    expect(expectedOrderedPile).toEqual(game.orderedPile);
    expect(expectedHighCard).toEqual(game.highCard);
    expect(expectedFullHousesOrdened).toEqual(game.fullHouse.map(e => e.sort()).sort());
  });
  // it('User Input - Cards:  6S, 10S, 10C and Rotation Card: 6C', () => {
  //   const expectedOrderedPile = ['10C', '6S', '10S'];
  //   const expectedHighCard = '10C';
  //   const game = Game('6C', ['6S', '10S', '10C']);
  //   expect(expectedOrderedPile).toEqual(game.orderedPile);
  //   expect(expectedHighCard).toEqual(game.highCard);
  // });
});

describe('Game', () => {
  it('throw on game when is not valid rotation card ', () => {
    expect(() => {
      Game('2', ['2H'])
    }).toThrow();
  });
  it('throw on game when is not valid pile ', () => {
    expect(() => {
      Game('2Q', ['A'])
    }).toThrow();
  });
});
