const { raw } = require('body-parser');

const loginController = {
    generateLoginPage: function (req,res){
        res.render('login');
    }
}
module.exports = loginController;