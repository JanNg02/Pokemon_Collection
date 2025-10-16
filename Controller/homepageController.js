const { raw } = require('body-parser');
const axios = require('axios');
const pokemon = require('pokemontcgsdk');

const homepageController = {
    generateHomePage: async function (req, res) {
        console.log("Session Username " + req.session.userName);

        try {
            // // Fetch cards
            // const cardsResponse = await axios.get('https://api.pokemontcg.io/v2/cards', {
            //     params: {
            //         q: 'name:charizard',
            //         pageSize: 1,
            //         page: 1
            //     },
            //     headers: {
            //         'X-Api-Key': process.env.POKEMONAPI
            //     }
            // });

            // Fetch the 3 latest sets
            const setsResponse = await axios.get('https://api.pokemontcg.io/v2/sets', {
                params: {
                    orderBy: '-releaseDate',
                    pageSize: 3,
                    page: 1
                },
                headers: {
                    'X-Api-Key': process.env.POKEMONAPI
                }
            });

            // console.log(cardsResponse.data);
            console.log(setsResponse.data);

            // Ensure responses have data
            //const cards = cardsResponse.data && cardsResponse.data.data ? cardsResponse.data.data : [];
            const sets = setsResponse.data && setsResponse.data.data ? setsResponse.data.data : [];

            // Pass both cards and sets to the homepage view
            //res.render('homepage', { cards: cards, sets: sets });
            res.render('homepage', {sets: sets});
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            //res.render('homepage', { cards: [], sets: [] });
            res.render('homepage', {sets: []});
        }
    }
}
module.exports = homepageController;