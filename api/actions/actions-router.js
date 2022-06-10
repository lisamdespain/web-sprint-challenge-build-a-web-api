// Write your "actions" router here!
const express = require('express');

const Actions = require('./actions-model.js');
// bring in middleware 
const { validateProjectId } = require('../projects/projects-middleware')
const { verifyActionId, verifyAction } = require('./actions-middlware')
const router = express.Router();

router.get('/', (req, res) =>{
    Actions.get()
    .then(actionList =>{
        res.status(200).json(actionList)
    }).catch(error =>{
        res.status(500).json({message: 'There is a problem with the server'})
    })
})

router.get('/:id', verifyActionId, (req, res) =>{
    res.status(200).json(req.action);
})

router.post('/', verifyAction, validateProjectId, (req, res) =>{
    Actions.insert(req.newAction)
    .then(action=>{
        res.status(201).json(action)
    }).catch(error =>{
        res.status(500).json({message: 'There is a problem with the server'})
    })
})

router.put('/:id', verifyActionId, verifyAction, (req, res)=>{
    Actions.update(req.params.id, req.body)
    .then(updatedAction =>{
        res.status(200).json(updatedAction)
    }).catch(error =>{
        res.status(500).json({ message: 'there was an issue with the server'})
      })
})

router.delete('/:id', verifyActionId, (req, res) =>{
    Actions.remove(req.params.id)
    .then(result =>{
        res.status(200).json({message: 'The action was deleted'});
    }).catch(error =>{
        res.status(500).json({ message: 'there was an issue with the server'})
      })
})
module.exports = router;