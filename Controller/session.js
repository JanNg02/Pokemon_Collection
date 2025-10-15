exports.isAuth = async function(req, res, next){
    if (!req.session.userID) {
        return res.redirect('/login'); //If there is no session, go back to login page
    } else{
        return res.redirect('/');
    }
};