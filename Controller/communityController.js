const { raw } = require('body-parser');
const TCGdex = require('@tcgdex/sdk').default;
const tcgdex = new TCGdex('en');
const collectionBinder = require('../Model/collectionModel.js');

const communityController = {
    generateCommunityPage: async  function (req,res){
        const currUser = req.session.userID;

        var collections = await collectionBinder.find({ userID: { $ne: currUser } });

        res.render('communityPage', {collections: collections});
    },
    displayCommunityCollection: async  function (req,res){
        const currCol = req.params.binderID;
        var userCheck = false;
        var cards = [];
        console.log(currCol)
        var collection = await collectionBinder.findOne({binderID: currCol});

        for (var i = 0; i < collection.collectionCards.length; i++) {
            try {
                var card = await tcgdex.card.get(collection.collectionCards[i]);
                if (card) {
                    cards.push({ id: card.id, image: card.image, name: card.name });
                }
            } catch (error) {
                console.error(`Error fetching card ${collection.collectionCards[i]}:`, error);
            }
        }
        res.render('collectionPage', { collection: collection, cards: cards, userCheck: userCheck});
    },
    likeCollection: async function (req, res) {
        const binderID = req.body.binderID;
        try {
            await collectionBinder.updateOne(
                { binderID: binderID },
                { $inc: { likes: 1 } }
            );
            const updatedCollection = await collectionBinder.findOne({ binderID: binderID });
            res.json({ success: true, likes: updatedCollection.likes });
        } catch (error) {
            console.error('Error liking collection:', error);
            res.status(500).json({ success: false, message: 'Failed to like collection' });
        }
    }

}
module.exports = communityController;