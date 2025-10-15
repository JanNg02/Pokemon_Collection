const { raw } = require('body-parser');
const users = require('../Model/userModel.js');

const registerController = {
    generateRegisterPage: function (req,res){
        res.render('register');
    },
    registerUser: async function (req,res){
        var checkID = await users.countDocuments({}); 
        var email = req.body.email;
        var userName = req.body.userName;  
        var password = req.body.password; 

        var setIdNum = checkID+1;

        const userCreate = await users.create({
            userID: setIdNum, 
            email: email, 
            userName, userName,
            password: password
        }).then(async (result) => {
            console.log("Creating User is Successful");
            res.redirect('/login');
        })
        .catch((err) => {
            console.log("Creating UserFailed");
            console.log(err)
            res.redirect('/register');
        });
    }
}
module.exports = registerController;