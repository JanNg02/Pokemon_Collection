const TCGdex = require('@tcgdex/sdk').default;
const tcgdex = new TCGdex('en');

const homepageController = {
    generateHomePage: async function (req, res) {
        console.log("Session Username " + req.session.userName);

        try {
            const sets = await tcgdex.fetch('sets');
            
            // Sort sets by releaseDate descending and get the latest 3
            const latestSets = sets
                .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
                .slice(0, 3);

            console.log(latestSets); 

            // Pass sets to the homepage view
            res.render('homepage', {sets: latestSets});
        } catch (error) {
            console.error('Error fetching sets:', error);
            res.render('homepage', {sets: []});
        }
    }
}
module.exports = homepageController;