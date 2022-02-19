const notes = require('express').Router();
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid'); 
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../public/helpers/fsUtils');


notes.get('/api/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.get('/api/notes/:id', (req, res) => {
  const noteId = req.params.noteId;
  readFromFile('./db/db.json')
  .then((data) => JSON.parse(data))
  .then((json) => {
    const result = json.filter((note) => note.noteId !== noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});



notes.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.noteId;
  readFromFile('./db/db.json')
  .then((data) => JSON.parse(data))
  .then((json) => {
    const result = json.filter((note) => note.noteId !== noteId);

    // Save that array to the filesystem
    writeToFile('./db/db.json', result);

    // Respond to the DELETE request
    res.json(`Item ${noteId} has been deleted 🗑️`);
  })
})


notes.post('/api/notes', (req, res) => {
  console.log(req.body);
  //Destructuring assignment for the items in req.body
  const { title , text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newDb = {
      title: req.body.title,
      text: req.body.text,
      noteId: uuidv4(),
      }
      
    readAndAppend(newDb, './db/db.json');

    const response = {
      status: 'success',
      body: newDb,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  };
});



module.exports = notes





















// //GET Route for retriving all the db
// notes.get('api/notes', (req, res) => {
//   readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
// });

// // POST Route for submitting notes
// notes.post('/', (req, res) => {
//   // Destructuring assignment for the items in req.body
//   const { title , text } = req.body;

//   // If all the required properties are present
//   if (title && text) {
//     // Variable for the object we will save
//     const newDb = {
//       title,
//       text,
//       noteId: uuidv4(),
//     };

//     readAndAppend(newDb, './db/db.json');

//     const response = {
//       status: 'success',
//       body: newDb,
//     };

//     res.json(response);
//   } else {
//     res.json('Error in posting feedback');
//   }
// });

// module.exports = notes;



// fs.readFile('./db/db.json', 'utf8', (err, data) => {
//   if (err) throw err;
  
//   const parsedData = JSON.parse(data);
    
  
//   notes.get('/api/notes', (req, res) =>
//   //res.sendFile(path.join(__dirname, './db/db.json'))
//   //fs.readFile('/db/db.json', 'utf8').then((data) => res.json(JSON.parse(data)))
//   res.json(parsedData)
//   )
  
//   //POST Route for posting all the db
//   notes.post('/api/notes', (req, res) => {
//   // Destructuring assignment for the items in req.body
//   const { title , text } = req.body;

//   // If all the required properties are present
//   if (title && text) {
//     // Variable for the object we will save
//     const newDb = {
//       title,
//       text,
//       noteId: uuidv4(),
//     };
    
//     parsedData.push(req.body);
//     //writeToFile('/db/db.json', parsedData)
//     //fs.readFile(newDb, './db/db.json');

//     const response = {
//       status: 'success',
//       body: newDb,
//     };

//     res.json(response);
//   } else {
//     res.json('Error in posting note');
//   }
// });
// })




//module.exports = notes;