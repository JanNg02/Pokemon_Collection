const { raw } = require('body-parser');

const registerController = {
    generateRegisterPage: function (req,res){
        res.render('register');
    }
}
module.exports = registerController;