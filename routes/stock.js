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

router.get('/cbrsl3', (req, res) => {
    res.render('cbrsl3', { title: 'Core BRS Line 3' });
});


router.get('/cbrsl4', (req, res) => {
    res.render('cbrsl4', { title: 'Core BRS Line 4'});
});

router.get('/brz', (req, res) => {
    res.render('brz', { title: 'Brazing'});
});

router.get('/suf', (req, res) => {
    res.render('suf', { title: 'Surface'});
});


module.exports = router;
