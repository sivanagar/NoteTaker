const fs = require('fs');
const path = require("path");
const router = require('express').Router();
const  {createNewNote , deleteNote} = require('../../lib/notes');
const  db  = require('../../db/db');

// fs.watch(path.join(__dirname, '../../db/db.json'), (eventType, filename) => {
//     console.log("\nThe file", filename, "was modified!");
//     console.log("The type of change was:", eventType);
//     db  = require('../../db/db');
//   });


router.get('/notes', (req,res) => {
    let results = db
    res.json(results);
})

router.post('/notes', (req, res) => {
        req.body.id = db.length.toString();
        const note = createNewNote(req.body, db)
        res.json(db);
    })  

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id.toString()
    if(deleteNote(id,db)) {
        process.location.reload()
        res.status(200).send('The note deleted!');
    } else {
    
    res.status(400).send('There is not note to delete');
}})


module.exports = router;