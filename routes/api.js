const api = require('express').Router();

//ID - Maybe use for delete function 
//const { v4: uuidv4 } = require('uuid'); 

//GET Route for retriving all the db
api.get('/api/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);


//POST Route for posting all the db
api.post('/api/notes', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title , text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newDb = {
      title,
      text,
      //noteId: uuidv4(),
    };

    readAndAppend(newDb, './db/db.json');

    const response = {
      status: 'success',
      body: newDb,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});



module.exports = api;