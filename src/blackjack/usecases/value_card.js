"use strict";

/**
 * This function converts the string value of a card to number
 * @param {string} card 
 * @returns {number} card's numeric value
 */
export function getValueFromCard(card) {
  const lastDigitFromTheCard = card.length - 1;
  const cardStrDigits = card.substring(0, lastDigitFromTheCard);

  if (isNaN(cardStrDigits)) {
    const cardValue = cardStrDigits === "A" ? 11 : 10;
    return cardValue;
  }

  return Number(cardStrDigits);
}
