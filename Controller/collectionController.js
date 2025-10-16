const { raw } = require('body-parser');
const TCGdex = require('@tcgdex/sdk').default;
const tcgdex = new TCGdex('en');
const collectionBinder = require('../Model/collectionModel.js');

const setViewCardsController = {
    displayCollection: async function (req, res) {
        const currUser = req.session.userID;
        var cards = [];

        var collection = await collectionBinder.findOne({userID: currUser});

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
        res.render('collectionPage', { collection: collection, cards: cards });
    },
    addToCollection: async function (req, res) {
        const currUser = req.session.userID;
        const currUserName = req.session.userName;
        const cardID = req.params.cardID;
        var collectionArray = [];

        console.log(cardID);
        collectionArray.push(cardID);

        var isFound = await collectionBinder.findOne({userID: currUser});

        if(isFound){
            await collectionBinder.updateOne(
                {userID: currUser},
                {$push: {collectionCards: cardID}}
            );
            console.log("Card added to existing collection successfully");
            res.redirect('/viewCollection');
        } else {
            const createCollection = await collectionBinder.create({
                binderID: currUserName+"Collection",
                userID: currUser,
                binderName: "Collection1",
                userName: currUserName,
                collectionCards: collectionArray
            }).then(async (result) => {
                console.log("Creating Collection is Successful");
                res.redirect('/viewCollection');
            }).catch((err) => {
                console.log("Creating Collection Failed");
                console.log(err)
                res.redirect('/');
            });
        }
    },
    deleteFromCollection: async function (req, res) {
        const currUser = req.session.userID;
        const cardID = req.params.cardID;

        await collectionBinder.updateOne(
            {userID: currUser},
            {$pull: {collectionCards: cardID}}
        );
        console.log("Card removed from collection successfully");
        res.redirect('/viewCollection');
    }
}
module.exports = setViewCardsController;
