const { raw } = require('body-parser');

const homepageController = {
    generateHomePage: function (req,res){
        console.log("Session Username " + req.session.userName);
        res.render('homepage');
    }
}
module.exports = homepageController;