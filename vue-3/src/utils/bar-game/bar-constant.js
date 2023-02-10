export const LEVEL = {
  normal: [1,2,22,7,3,10,25,4,24,19,17,11, 5],
  medium: [1,8,7,12,18,23,19,5,17,15,16,3],
  perfectly: [6,12,18,23,20,15,8,22,25, 5],
  strongly: [8, 6, 12, 18, 23, 20, 15]
};

export const BAR_LAYOUT = [
  1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 16, 18, 25, 24, 23, 22, 21, 20, 19, 17, 15, 13, 11, 8
];

export const AWARD = [
  { score: 2, position: [6, 12, 18, 23, 20, 15, 8] },
  { score: 5, position: [16, 11] },
  { score: 10, position: [1,2,7,25,24,19] },
  { score: 20, position: [10,22,17] },
  { score: 50, position: [3] },
  { score: 100, position: [4] }];

  export const INITIALIZE_ITEM_PLAYER_SELECTED = [
    { type: 'orange', amount: 0, position: [1, 18, 25] },
    { type: 'toadFruit', amount: 0, position: [7, 20, 19] },
    { type: 'apple', amount: 0, position: [5, 6, 16, 11] },
    { type: 'bell', amount: 0, position: [8, 2, 24] },
    { type: 'star', amount: 0, position: [15, 17] },
    { type: 'watermelon', amount: 0, position: [10, 12] },
    { type: 'sevenSeven', amount: 0, position: [22, 23] },
    { type: 'bar', amount: 0, position: [3, 4] }
  ];

  export const INITIALIZE_PREVIOUS_ITEM_PLAYER_SELECTED = [{ type: 'orange', amount: 0},{ type: 'toadFruit', amount: 0 },{ type: 'apple', amount: 0 },{ type: 'bell', amount: 0 },{ type: 'star', amount: 0 },
  { type: 'watermelon', amount: 0 },
  { type: 'sevenSeven', amount: 0},
  { type: 'bar', amount: 0}];

  export const MAX_TURN_SCORE = [10,5,12,20,33,51];