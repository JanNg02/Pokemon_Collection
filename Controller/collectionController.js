const { raw } = require('body-parser');
const TCGdex = require('@tcgdex/sdk').default;
const tcgdex = new TCGdex('en');
const collectionBinder = require('../Model/collectionModel.js');

const setViewCardsController = {
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
            res.redirect('/');
        } else {
            const createCollection = await collectionBinder.create({
                binderID: currUserName+"Collection",
                userID: currUser,
                binderName: "Collection1",
                userName: currUserName,
                collectionCards: collectionArray
            }).then(async (result) => {
                console.log("Creating Collection is Successful");
                res.redirect('/');
            }).catch((err) => {
                console.log("Creating Collection Failed");
                console.log(err)
                res.redirect('/');
            });
        }
    }
}
module.exports = setViewCardsController;
