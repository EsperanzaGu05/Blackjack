let deck = [] // of cards
const types = ['C', 'H', 'D', 'S'] // Clover, Hearts, Diamonds, Spades
const specials = ['A', 'J', 'Q', 'K'] //As, Jack, Queen, King
// This function create a new deck in order
const createDeck = () => {
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
    deck = _.shuffle(deck)
    console.log(deck);
    return deck
}

createDeck()

// This function will allow to ask for a card

const askCard = () => {
    if (deck.length === 0) {
        throw 'No  more cards in the deck'
    }

    const card = deck.shift()
    console.log(deck);
    console.log(card);
    return card
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

const value = cardValue(askCard())
console.log({ value });