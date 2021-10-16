const fs = require('fs');
const path = require("path");
const router = require('express').Router();
const  {createNewNote , deleteNote} = require('../../lib/notes');
const  db  = require('../../db/db');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req,res) => {
    res.json(db);
})

router.post('/notes', (req, res) => {
        req.body.id = uuidv4();
        const note = createNewNote(req.body)
        res.json(db);
})  

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id.toString()
    if(deleteNote(id)) {
        res.status(200).send('The note deleted!');
    } else {
    
    res.status(400).send('There is not note to delete');
}})


module.exports = router;