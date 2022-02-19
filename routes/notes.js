const notes = require('express').Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid'); 

//ID - Maybe use for delete function 


//GET Route for retriving all the db

fs.readFile('./db/db.json', 'utf8', (err, data) => {
  if (err) throw err;
  
  const parsedData = JSON.parse(data);
    
  
  notes.get('/api/notes', (req, res) =>
  //res.sendFile(path.join(__dirname, './db/db.json'))
  //fs.readFile('/db/db.json', 'utf8').then((data) => res.json(JSON.parse(data)))
  res.json(parsedData)
  )
  
  //POST Route for posting all the db
  notes.post('/api/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title , text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newDb = {
      title,
      text,
      noteId: uuidv4(),
    };
    
    parsedData.push(req.body);
    //writeToFile('/db/db.json', parsedData)
    //fs.readFile(newDb, './db/db.json');

    const response = {
      status: 'success',
      body: newDb,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});
})




module.exports = notes;