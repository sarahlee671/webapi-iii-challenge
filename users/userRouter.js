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
    console.log(req.params)
    userData
        .getUserPosts(req.params.id)
        .then(userPosts => {
            if (userPosts === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist."}) 
            } else {
                res.status(200).json(userPosts)
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user posts could not be retrieved."})
        })
            

});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    userData
        .remove(id)
        .then(id => {
            if (id.length) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json({ message: "User was successfully deleted" })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The user could not be removed" })
        })
})
           

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
