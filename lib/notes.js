const fs = require("fs");
const path = require("path");

function reArrangeNotes(db) {
    db.map((note, i) => {
        note.id =i+1;
    })
    return db;
}

function createNewNote(body,db) {
    const note = body;
    db.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(db,null, 2)
    )
    return note;
}

function deleteNote(id,db) {
    if (db.filter(note => note.id.toString() === id).length===0) { 
        console.log('No Note with this ID'+ id);
        return false;
    } else {
        db = db.filter(note => note.id.toString() !== id);
        
        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(reArrangeNotes(db),null, 2)
        ) 
        return true;
 }
}

module.exports = {
    createNewNote,
    deleteNote
};
  