// add middlewares here related to projects
const Projects = require('./projects-model');

function validateProjectId(req,res, next){
    Projects.get(req.params.id)
    .then(result =>{
        if (result == null){
            res.status(404).json({message: 'No project with that ID exists.'})
            return;
        }
        req.project = result;
        next();
})
}

function validateProjectInput(req, res, next){
    let { name, description } = req.body;
    if (name == null || name.trim() == "" || description == null || description.trim() ==""){
        res.status(400).json({message: 'Name and description are required'})
        return;
    }
    req.newProject = req.body
    next();
}

function validateProjectCompleted(req, res, next){
    let { completed } = req.body;
    if (completed == null){
        res.status(400).json({message: 'Name, description, and completed are required'})
        return;
    }
    req.newProject = req.body
    next();
}

module.exports = {
    validateProjectId, 
    validateProjectInput,
    validateProjectCompleted
}