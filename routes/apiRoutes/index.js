const router = require('express').Router();
const  {createNewNote , deleteNote} = require('../../lib/notes');
const  db  = require('../../db/db');



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
        res.status(200).send('The note deleted!');
    } else {
    //should send the note to deleteNote function
    res.status(400).send('There is not note to delete');
}})


module.exports = router;