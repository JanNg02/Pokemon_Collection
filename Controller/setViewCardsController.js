const { raw } = require('body-parser');
const axios = require('axios');
const pokemon = require('pokemontcgsdk');
const TCGdex = require('@tcgdex/sdk').default;
const tcgdex = new TCGdex('en');

const setViewCardsController = {
    generateViewPage: async function (req, res) {
        const setId = req.params.setId;
        const cards = await tcgdex.fetch('sets', setId);

        res.render('setViewCards', {cards: cards});
    }
}
module.exports = setViewCardsController;
