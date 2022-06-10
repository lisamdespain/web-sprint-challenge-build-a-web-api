// add middlewares here related to actions
const Actions = require('./actions-model')

function verifyActionId(req,res, next){
    Actions.get(req.params.id)
    .then(result =>{
        if (result == null){
            res.status(404).json({message: 'No action with that ID exists.'})
            return;
        }
        req.action = result;
        next();
})
}

function verifyAction(req, res, next){
    let { notes, description, project_id } = req.body
    if (notes == null || notes.trim() =='' || description == null || description.trim() == '' || project_id == null){
        res.status(400).json({message: 'The notes, description,and project id are required'})
        return;
    }
    req.newAction = {notes, description, project_id};
    next();
}

function verifyCompleted(req, res, next){
    let { completed } = req.body
    if (completed == null){
        res.status(400).json({message: 'Name, description, and completed are required'})
        return;
    }
    req.newAction = req.body;
    next();
}

module.exports = {
    verifyActionId,
    verifyAction,
    verifyCompleted
}