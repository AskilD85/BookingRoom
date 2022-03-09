const cors = require('cors');
const fs = require('fs')
const bodyParser = require('body-parser');
const express = require('express');

// Create express app
const app = express();
app.use(cors());
app.use(bodyParser.json());


//получение списка комнат
app.get ('/api/rooms', (req, res) => {
  if (req.body) {

  //читаем из файла
  fs.readFile("./rooms.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    };

    // Get current users data
    var data = JSON.parse(data.toString());

res.status(200).send( JSON.stringify(data) );

});
  }

});


app.put('/api/new', (req, res) => {
    if (req.body) {
        let body = req.body;
        DATABASE.USERS.push({ name: body.name, email: body.email, password: body.password });
        res.status(200).send({ message: 'User has been successfully created.' });
    } else {
        res.status(500).send({
            errorMessage: 'Incorrect data'
        });
    }
});

app.listen(5000, () => console.log('Server started on port 5000'));
