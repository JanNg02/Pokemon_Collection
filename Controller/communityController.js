const { raw } = require('body-parser');
const collectionBinder = require('../Model/collectionModel.js');

const communityController = {
    generateCommunityPage:async  function (req,res){
        const currUser = req.session.userID;

        var collections = await collectionBinder.find({ userID: { $ne: currUser } });

        res.render('communityPage', {collections: collections});
    }

}
module.exports = communityController;