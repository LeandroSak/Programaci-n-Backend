const express = require('express');

const router = express.Router();



router.get('/signin', async (_req, res) => {
    res.render('pages/signin');
})
router.post('/signinn', async (req, res) => {
    try {
        const { name } = req.body;
        req.session.user = name;
        res.status(200).redirect('/');
    } catch (error) {
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
})
router.get('/logout', async (req, res,) => {
    try {
        const name = req.session.user
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
            res.render('pages/logout', { name: name })
        });
    } catch (error) {
        res.status(400).json({
            response: "error",
            error: error.message
        })
    }
})


module.exports = router;