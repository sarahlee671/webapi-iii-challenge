const express = require('express');

const userData = require('./userDb.js');





const router = express.Router();

router.post('/', (req, res) => {


});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    userData
        .get()
        .then(users => {
            res.status(200).json({users});
        })
        .catch(error => {
            res.status(500).json({error: "The users could not be retrieved"})
        })

});

router.get('/:id', async (req, res) => {
    try {
        const user = await userData.getById(req.params.id);
        console.log(user.length)
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "The user information could not be retrieved."});
    }
});


router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
