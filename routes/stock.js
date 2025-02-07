const express = require('express');
const router = express.Router();

router.get('/main', (req, res) => {
    res.render('main', { title: 'Main' });
});

router.get('/pp', (req, res) => {
    res.render('pp', { title: 'Press Part'});
});

router.get('/ctrp', (req, res) => {
    res.render('ctrp', { title: 'Center Repack'});
});

router.get('/cbrsl1', (req, res) => {
    res.render('cbrsl1', { title: 'Core BRS Line 1' });
});


router.get('/cbrsl4', (req, res) => {
    res.render('cbrsl4', { title: 'Core BRS Line 4'});
});


module.exports = router;
