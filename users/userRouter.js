const express = require('express');

const userData = require('./userDb.js');





const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await userData.insert(req.body);
        res.status(201).json(user);
      } catch (error) {
        // log error to server
        console.log(error);
        res.status(500).json({
          message: 'Error adding user',
        });
      }
});

router.post('/:id/posts', async (req, res) => {
    try {
        const userPost = {text: req.body.text, user_id: req.params.id}
    
        res.status(200).json(userPost);
    } catch (error) {
        // log error to server
    console.log(error);
    res.status(500).json({
        message: 'Error getting the post for the user',
    });
    }
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
    const { id } = req.params;
    const { name } = req.body;
    userData
      .update(id, { name })
      .then(res => {
        if (res === 0) {
            res.status(404).json({ message: "The user could not be found" });
        } else {
          userData.getById(id).then(user => {
            res.json(user);
          });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Error updating user"})
      });
  
})

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
