const router = require("express").Router();
const User = require("../models/user")

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    return res.render('signup');
})

router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/')
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
        try {
            const token = await User.matchPasswordandGenerateToken(email, password);
            console.log(token);
            res.cookie('token', token);
            return res.redirect('/');
        } catch (error) {
            return res.render('signin', {
                error : 'Incorrect Email or Password'
            })
        }

})

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
});

module.exports = router;