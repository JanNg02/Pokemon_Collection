const { raw } = require('body-parser');
const axios = require('axios');
const pokemon = require('pokemontcgsdk');

const setViewCardsController = {
    generateViewPage: async function (req, res) {
        const setId = req.params.setId;
        try {
            // Fetch the set details
            const setResponse = await axios.get(`https://api.pokemontcg.io/v2/sets/${setId}`, {
                headers: {
                    'X-Api-Key': process.env.POKEMONAPI
                }
            });
            const set = setResponse.data.data;

            // Fetch all cards for the set using pagination
            let allCards = [];
            let page = 1;
            const pageSize = 250; // Max allowed by API

            while (true) {
                const cardsResponse = await axios.get('https://api.pokemontcg.io/v2/cards', {
                    params: {
                        q: `set.id:${setId}`,
                        pageSize: pageSize,
                        page: page
                    },
                    headers: {
                        'X-Api-Key': process.env.POKEMONAPI
                    }
                });
                const cards = cardsResponse.data.data;
                allCards = allCards.concat(cards);
                if (cards.length < pageSize) break;
                page++;
            }
            const cards = allCards;

            res.render('setViewCards', { setName: set.name, cards: cards });
        } catch (error) {
            console.error('Error fetching set or cards:', error);
            res.render('setViewCards', { setName: 'Unknown Set', cards: [] });
        }
    }
}
module.exports = setViewCardsController;
