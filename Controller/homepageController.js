const { raw } = require('body-parser');

const homepageController = {
    generateHomePage: function (req,res){
        res.render('homepage');
    }
}
module.exports = homepageController;