$(document).ready(function() {
  const $gameContainer = $('#gameContainer');
  const $message = $('#message');
  const $startButton = $('#startButton');

  const cardsArray = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'
  ];

  let cards = [];
  let firstCard = null;
  let secondCard = null;
  let matches = 0;
  let attempts = 0;

  $startButton.on('click', startGame);

  function startGame() {
    $message.text('');
    $gameContainer.empty();
    matches = 0;
    attempts = 0;
    firstCard = null;
    secondCard = null;

    // Shuffle cards
    cards = shuffle(cardsArray);

    // Display cards
    cards.forEach((card, index) => {
      const $cardElement = $('<div></div>')
        .addClass('card')
        .data('value', card)
        .data('index', index)
        .on('click', handleCardClick);
      $gameContainer.append($cardElement);
    });
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function handleCardClick() {
    const $clickedCard = $(this);

    if ($clickedCard.hasClass('matched') || $clickedCard.is(firstCard) || $clickedCard.is(secondCard)) {
      return;
    }

    $clickedCard.text($clickedCard.data('value')).addClass('hidden');

    if (!firstCard) {
      firstCard = $clickedCard;
    } else if (!secondCard) {
      secondCard = $clickedCard;
      attempts++;

      if (firstCard.data('value') === secondCard.data('value')) {
        firstCard.addClass('matched');
        secondCard.addClass('matched');
        matches++;

        firstCard = null;
        secondCard = null;

        if (matches === cardsArray.length / 2) {
          $message.text(`You won in ${attempts} attempts!`);
        }
      } else {
        setTimeout(() => {
          firstCard.text('').removeClass('hidden');
          secondCard.text('').removeClass('hidden');

          firstCard = null;
          secondCard = null;
        }, 1000);
      }
    }
  }
});
