const fs = require("fs");
const path = require("path");
const  db  = require('../db/db.json');

function createNewNote(body) {
    const note = body;
    db.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(db,null, 2)
    )
    return note;
}

function deleteNote(id) {
    if (db.filter(note => note.id.toString() === id).length===0) { 
        console.log('No Note with this ID'+ id);
        return false;
    } else {
        let newArray = db.filter(note => note.id.toString() !== id);
        
        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(newArray,null, 2)
        ) 
        return true;
 }
}

module.exports = {
    createNewNote,
    deleteNote
};
  