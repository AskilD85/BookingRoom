const cors = require('cors');
const fs = require('fs')
const bodyParser = require('body-parser');
const express = require('express');
const formData = require("express-form-data");

// Create express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// parse data with connect-multiparty.
app.use(formData.parse());



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


app.post('/api/rooms',   (req, res) => {


    if (req.body) {
        var data1 = JSON.parse(req.body.data.toString());
    fs.writeFile("./rooms.json", JSON.stringify(data1), (err, result) => {  // WRITE
        if (err) {
          const status = 401
          const message = err
          res.status(status).json({status, message})
          return
        }
    });

    res.status(200).send( { message: "Good! Your booking time of room  is updated successfully!"}  );

    } else {
        res.status(500).send({
            errorMessage: 'Incorrect data'
        });
    }

    res.status(200).send({ message: 'Somthing went wrong?'});

});


app.listen(5000, () => console.log('Server started on port 5000'));
