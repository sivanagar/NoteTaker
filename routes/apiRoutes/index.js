const fs = require('fs');
const path = require("path");
const router = require('express').Router();
//const  {createNewNote , deleteNote} = require('../../lib/notes');
const  db  = require('../../db/db');
const { v4: uuidv4 } = require('uuid');
let notes = db;


const  writeFile = (array) => {
    //update file function
    fs.writeFileSync(path.join(__dirname, '../../db/db.json'), JSON.stringify(array,null, 2))
}

function deleteNote(id) {
    //check if note exists
    if (notes.filter(note => note.id === id).length===0) { 
        return false;
    } else {
        //update notes and file
        notes = notes.filter(note => note.id !== id);
        writeFile(notes)
        return true;
 }
}   

function createNewNote(body) {
    const note = body;
    //update notes array and file
    notes.push(note);
    writeFile(notes)
    return note;
}


router.get('/notes', (req,res) => {
    res.json(notes);
})

router.post('/notes', (req, res) => {
        req.body.id = uuidv4();
        const note = createNewNote(req.body)
        res.json(note);
})  

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id.toString()
    if(deleteNote(id)) {
        res.json(id);
    } else {
    res.status(400).send('There is not note to delete');
    }
})


module.exports = router;