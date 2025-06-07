const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Welcome!!!🎆🎆🎆');
});

router.use('/products', require('./products'));

router.use('/farmers', require('./farmers'));

module.exports = router;