const router = require("express").Router();
const User = require("../models/user")

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
})

router.post('/signin', (req , res) => {
    const {email, password} = req.body;

    const isMathced = User.matchPassword(email, password);
    if(isMathced) return res.render('home')
        else return res.redirect('/users/signin')

    
})

router.post('/signup', async (req, res) => {
    const {fullName, email, password} = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
});

module.exports = router;