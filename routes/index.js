const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Welcome!!!🎆🎆🎆');
});

router.use('/products', require('./products'));

router.use('/farmers', require('./farmers'));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home route
 *     description: Returns login status
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get('/login', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err);}
        res,redirect('/');
    });
});

module.exports = router;