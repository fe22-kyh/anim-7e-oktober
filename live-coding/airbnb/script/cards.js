const cardContainer = document.querySelector('.store')
const cardTemplate = fetch('./template/card.html')
const bnbData = fetch('./assets/data/bnb.json')

const initializeCardData = async () => {
  let template, cards
  await Promise.all([cardTemplate, bnbData]).then(async (responses) => {
    console.log(responses)
    template = await responses[0].text()
    cards = await responses[1].json()
  })

  return { template: template, cards: cards }
}

const loadCards = (async () => {
  const domParser = new DOMParser()
  const { template, cards } = await initializeCardData()

  cards.forEach((card) => {
    const cardElement = template
      .slice()
      .replace('{{card-name}}', card.name)
      .replace('{{card-host}}', card.host)
      .replace('{{card-date}}', card.date)
      .replace('{{card-rating}}', card.rating)
      .replace('{{card-price}}', card.price)
      .replace('{{card-image}}', card.image.ref)
      .replace('{{card-alt}}', card.image.ref)

    let pizzaDoc = domParser.parseFromString(cardElement, 'text/html')
    let element = pizzaDoc.documentElement.querySelector('.card')

    cardContainer.append(element)
  })
})()
