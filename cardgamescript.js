const gameContainer = document.getElementById('gameContainer');
const message = document.getElementById('message');
const startButton = document.getElementById('startButton');

const cardsArray = [
  'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'
];

let cards = [];
let firstCard = null;
let secondCard = null;
let matches = 0;
let attempts = 0;

startButton.addEventListener('click', startGame);

function startGame() {
  message.textContent = '';
  gameContainer.innerHTML = '';
  matches = 0;
  attempts = 0;
  firstCard = null;
  secondCard = null;

  // Shuffle cards
  cards = shuffle(cardsArray);

  // Display cards
  cards.forEach((card, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = card;
    cardElement.dataset.index = index;
    cardElement.addEventListener('click', handleCardClick);
    gameContainer.appendChild(cardElement);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function handleCardClick(event) {
  const clickedCard = event.target;

  if (clickedCard.classList.contains('matched') || clickedCard === firstCard || clickedCard === secondCard) {
    return;
  }

  clickedCard.textContent = clickedCard.dataset.value;
  clickedCard.classList.add('hidden');

  if (!firstCard) {
    firstCard = clickedCard;
  } else if (!secondCard) {
    secondCard = clickedCard;
    attempts++;

    if (firstCard.dataset.value === secondCard.dataset.value) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matches++;

      firstCard = null;
      secondCard = null;

      if (matches === cardsArray.length / 2) {
        message.textContent = `You won in ${attempts} attempts!`;
      }
    } else {
      setTimeout(() => {
        firstCard.textContent = '';
        firstCard.classList.remove('hidden');
        secondCard.textContent = '';
        secondCard.classList.remove('hidden');

        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }
}
