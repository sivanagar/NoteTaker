const router = require('express').Router();
const  {createNewNote} = require('../../lib/notes');
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


    //should receive a new note to save on the request body, 
    // add it to the db.json file, and then return the new note to the client. 
    // You'll need to find a way to give each note a unique id when it's saved 
    // (look into npm packages that could do this for you).


module.exports = router;