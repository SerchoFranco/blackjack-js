"use strict";
import _ from "underscore";
import { createDeck, getCard, getValueFromCard } from "./usecases";

// patron modulo
(function () {
  // Imports

  //Html DOM references
  const btnStartNewGame = document.querySelector("#btnStartNewGame");
  const btnGetCard = document.querySelector("#btnGetCard");
  const btnStopGame = document.querySelector("#btnStopGame");
  const pointElements = document.querySelectorAll(".points");
  const cardsContainers = document.querySelectorAll(".cards");

  //Variables and constants
  const CLASSES = {
    btnStartNewGame: "btn--green",
    btnGetCard: "btn--purple",
    btnStopGame: "btn--orange",
  };
  const BASIC_CARDS = ["C", "D", "H", "S"];
  const SPEACIAL_CARDS = ["A", "J", "Q", "K"];
  const deck = createDeck(BASIC_CARDS, SPEACIAL_CARDS);
  let points = 0;
  let userPoints = 0;
  let newDeck = [];

  //Functions
  function blockButton(button) {
    const idName = button.getAttribute("id");
    button.setAttribute("disabled", "true");
    button.classList.add("btn--disabled");
    button.classList.remove(CLASSES[idName]);
  }

  function resetButton(button) {
    const idName = button.getAttribute("id");
    button.removeAttribute("disabled");
    button.classList.remove("btn--disabled");
    button.classList.add(CLASSES[idName]);
  }

  function setCardToThePanel(playerPanel, theCard) {
    cardsContainers[playerPanel].append(theCard);
  }

  function createCardComponent(card) {
    const cardElement = document.createElement("img");
    cardElement.src = `./assets/img/${card}.png`;
    cardElement.alt = "Carta del deck";
    cardElement.classList.add("card");
    return cardElement;
  }

  function playerTurn(playerNumber) {
    const card = getCard(newDeck);
    const cardElement = createCardComponent(card);
    const cardValue = getValueFromCard(card);
    points += cardValue;
    pointElements[playerNumber].textContent = points;
    setCardToThePanel(playerNumber, cardElement);
  }

  function determinateWinner(pointsPlayer1, pointsPlayer2) {
    const MAX_POINTS = 21;

    if (pointsPlayer1 > MAX_POINTS) {
      return "lose";
    }

    if (pointsPlayer2 > MAX_POINTS) {
      return "win";
    }

    return pointsPlayer2 > pointsPlayer1 ? "lose" : "tie";
  }

  function messageWinner(result) {
    const gameMessage = {
      win: "¡Felicidades, ganaste!",
      lose: "Gano la computadora",
      tie: "¡Empate, nadie gano!",
    };

    console.log(gameMessage[result]);
  }

  function playerWinner(pointsPlayer1, pointsPlayer2) {
    const result = determinateWinner(pointsPlayer1, pointsPlayer2);
    messageWinner(result);
  }

  function playingGame(playerNumber) {
    points = 0;
    blockButton(btnGetCard);
    blockButton(btnStopGame);

    // valida si el jugador perdio
    if (userPoints > 21) {
      playerTurn(playerNumber);
    }

    // valida que la computadora iguale o supere al jugador en puntos.
    if (userPoints <= 21) {
      while (userPoints > points) {
        playerTurn(playerNumber);
      }
    }
    // console.log({userPoints, points});

    playerWinner(userPoints, points);
  }

  function startGame(cardsDeck) {
    newDeck = _.shuffle(cardsDeck);
    // console.log(newDeck);
    points = 0;
    pointElements.forEach((element) => (element.textContent = points));
    cardsContainers.forEach((element) => (element.textContent = ""));
    blockButton(btnStartNewGame);
    resetButton(btnGetCard);
    resetButton(btnStopGame);
  }

  function loadEvents() {
    // Eventos
    btnStartNewGame.addEventListener("click", () => startGame(deck));

    btnGetCard.addEventListener("click", function () {
      resetButton(btnStartNewGame);
      playerTurn(0);
      userPoints = points;

      // condicion para validar el puntaje del usuario
      if (userPoints >= 21) {
        playingGame(1);
      }
    });

    btnStopGame.addEventListener("click", () => playingGame(1));
  }

  function runApp() {
    startGame(deck);
    loadEvents();
  }

  runApp();
})();
