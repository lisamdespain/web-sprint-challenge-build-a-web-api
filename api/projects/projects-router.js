// Write your "projects" router here!
const express = require('express');

const Projects = require('./projects-model.js');
// bring in middleware
const { validateProjectId, validateProjectInput, validateProjectCompleted } =require('./projects-middleware');
const router = express.Router();

router.get('/', (req, res) =>{
    Projects.get()
    .then(project =>{
        res.status(200).json(project);
    }).catch(error =>{
        res.status(500).json({message: 'There is a problem with the server'})
    })
})

router.get('/:id', validateProjectId, (req, res) =>{
    res.status(200).json(req.project);
})

router.post('/', validateProjectInput, (req, res) =>{
    Projects.insert(req.newProject)
    .then(result=>{
        res.status(201).json(result);
}).catch(error =>{
    res.status(500).json({message: 'There is a problem with the server'})
})
})

router.put('/:id', validateProjectId, validateProjectInput, validateProjectCompleted, (req, res) =>{
    Projects.update(req.params.id, req.body)
    .then(project =>{
        res.status(200).json(project);
    }).catch(error =>{
        res.status(500).json({message: 'There is a problem with the server'})
    })
})

router.delete('/:id', validateProjectId, (req, res)=>{
    Projects.remove(req.params.id)
    .then(project =>{
        res.status(200).json({message: 'The project was deleted'})
    }).catch(error =>{
        res.status(500).json({message: 'There is a problem with the server'})
    })
})

router.get('/:id/actions', validateProjectId, (req, res) =>{
    Projects.getProjectActions(req.params.id)
    .then(actions =>{
        res.status(200).json(actions)
    }).catch(error =>{
        res.status(500).json({message: 'There is a problem with the server'})
    })
})
module.exports = router;