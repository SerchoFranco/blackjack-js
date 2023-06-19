"use strict";


/**
 * create a card's deck (string array)
 * @param {Array<string>} basicCards ["C", "D", "H", "S"]
 * @param {Array<string>} specialCards ["A", "J", "Q", "K"]
 * @returns {Array<string>} returns a string array
 */
export function createDeck(basicCards, specialCards) {
  if (!basicCards || basicCards.length === 0) {
    throw new Error("basicCards are required");
  }

  if (!specialCards || specialCards.length === 0) {
    throw new Error("specialCards are required");
  }

  const originalDeck = [];
  const MAX_CARD_NUMBER = 10;

  // part one of the deck
  for (let i = 2; i <= MAX_CARD_NUMBER; i++) {
    basicCards.forEach((card) => originalDeck.push(i + card));
  } //end for loop

  //part two of the deck
  for (const specialCard of specialCards) {
    basicCards.forEach((card) => originalDeck.push(specialCard + card));
  } //end for of loop

  return originalDeck;
} //end createDeck function
