"use strict";

/**
 * Returns card's name that was extracted
 * @param {Array<string>} deck
 * @returns {string} returs card's name
 */

export function getCard(deck) {
  if (deck.length === 0) {
    throw new Error("No hay cartas en el deck");
  }

  const card = deck.pop();
  return card;
}
