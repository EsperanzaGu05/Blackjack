const myModule = (() => {
    'use strict'
    let deck = [] // of cards
    const types = ['C', 'H', 'D', 'S'], // Clover, Hearts, Diamonds, Spades
        specials = ['A', 'J', 'Q', 'K']; //As, Jack, Queen, King

    // let playerPoints = 0,
    //     computerPoints = 0;
    let playersPoints = [];
    //HTML REFERENCES
    const btnAsk = document.querySelector('#btnAsk'),
        btnStop = document.querySelector('#btnStop'),
        btnNew = document.querySelector('#btnNew')


    const divCardsPlayers = document.querySelectorAll('.divCards'),
        pointsHTML = document.querySelectorAll('small')
    // divPlayerCards = document.querySelector('#player-cards'),
    // divComputerCards = document.querySelector('#computer-cards');

    const initializeGame = (numPlayers = 2) => {
        deck = createDeck()
        playersPoints = [];
        // console.log({ numPlayers });
        for (let i = 0; i < numPlayers; i++) {
            playersPoints.push(0);
        }
        // console.log(({ playersPoints }));

        pointsHTML.forEach(elem => elem.innerText = 0);
        // smallPoints[0].innerText = 0
        // smallPoints[1].innerText = 0
        divCardsPlayers.forEach(elem => elem.innerHTML = '');
        btnAsk.disabled = false;
        btnStop.disabled = false;
    }


    // This function create a new deck in order
    const createDeck = () => {
        deck = []
        for (let i = 2; i <= 10; i++) {
            for (let type of types) {
                deck.push(i + type)
            }
        }

        for (let type of types) {
            for (let spec of specials) {
                deck.push(spec + type)
            }
        }
        // console.log(deck);
        // In this part we mix the deck in a random way
        // console.log(deck);
        return _.shuffle(deck);
    }
    // This function will allow to ask for a card

    const askCard = () => {
        if (deck.length === 0) {
            throw 'No  more cards in the deck'
        }
        // console.log(deck);
        // console.log(card);
        return deck.pop();
    }

    // askCard()

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1)
        // let points = 0

        // if (isNaN(value)) {
        //     // console.log('It is not a Number');
        //     points = (value === 'A') ? 11 : 10;
        // } else {
        //     console.log('It is a Number');
        //     points = value * 1
        // }

        // console.log(points);

        return (isNaN(value)) ?
            (value === "A") ? 11 : 10
            : value * 1

    }
    // const value = cardValue(askCard())

    // console.log({ value });


    const acumulatePoints = (card, turn) => {
        playersPoints[turn] += cardValue(card);

        pointsHTML[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    }

    const createCards = (card, turn) => {
        const imgNewCard = document.createElement('img');
        imgNewCard.src = `./cards/${card}.png`
        imgNewCard.classList.add('cards')
        divCardsPlayers[turn].append(imgNewCard);
    }

    const defineWinner = () => {

        const [minimumPoints, computerPoints] = playersPoints;
        console.log({ computerPoints });
        setTimeout(() => {
            if (computerPoints === minimumPoints) {
                alert('No winner')
            } else if (minimumPoints > 21) {
                alert('Computer wins')
            } else if (computerPoints > 21) {
                alert('player 1 wins')
            } else if (minimumPoints > computerPoints) {
                alert('player 1 wins')
            }
            else {
                alert('Computer wins')
            }
        }, 100)
    }
    //Computer turn

    const computerTurn = (minimumPoints) => {
        let computerPoints = 0
        do {
            const card = askCard()
            // computerPoints = computerPoints + cardValue(card)
            // smallPoints[1].innerText = computerPoints
            computerPoints = acumulatePoints(card, playersPoints.length - 1);
            createCards(card, playersPoints.length - 1);
            // const imgNewCard = document.createElement('img');
            // imgNewCard.src = `./cards/${card}.png`
            // imgNewCard.classList.add('cards')
            // divComputerCards.append(imgNewCard);

            // if (minimumPoints > 21) {
            //     break;
            // }

        } while ((computerPoints < minimumPoints) && (minimumPoints <= 21));
        defineWinner()

    }

    //Events

    btnAsk.addEventListener('click', () => {

        const card = askCard()
        // playerPoints = playerPoints + cardValue(card)
        // smallPoints[0].innerText = playerPoints

        const playerPoints = acumulatePoints(card, 0)
        createCards(card, 0)
        // const imgNewCard = document.createElement('img');
        // imgNewCard.src = `./cards/${card}.png`
        // imgNewCard.classList.add('cards')
        // divPlayerCards.append(imgNewCard);

        if (playerPoints > 21) {
            console.log('You lose');
            btnAsk.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints[0])
        } else if (playerPoints === 21) {
            console.log('You got 21');
            btnAsk.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints)

        }
        return playerPoints
    })

    btnStop.addEventListener('click', () => {

        btnAsk.disabled = true;
        btnStop.disabled = true;
        computerTurn(playersPoints)
    })

    btnNew.addEventListener('click', () => {
        console.clear();
        initializeGame();
    })
    return {
        newGame: initializeGame
    }
})()