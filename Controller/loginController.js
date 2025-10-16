const { raw } = require('body-parser');
const users = require('../Model/userModel.js');
const TCGdex = require('@tcgdex/sdk').default;
const tcgdex = new TCGdex('en');

const loginController = {
    generateLoginPage:async  function (req,res){
        res.render('login');
    },
    loginUser: async function(req, res){
        const email = req.body.email;
        const password = req.body.password;
        var user = await users.findOne({email: email});

        if(user){
            if(user.password == password){
                req.session.userID = user.userID;
                req.session.userName = user.userName;
                console.log("Pass");
                res.redirect('/');
            }
        } else {
            console.log("Failed")
            res.redirect('/login'); 
        }
    },
    logoutUser: async function(req, res){
        if(req.session){ //If session exists
            req.session.destroy(()=>{ //Destroy current session
                res.clearCookie('connect.sid'); //Clear cookie data
                res.redirect('/login'); //Return to login screen
            });
        }
    }
}
module.exports = loginController;