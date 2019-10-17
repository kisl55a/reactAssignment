const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
var cors = require('cors');
const db = require('./db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;

const saltRounds = 4;
app.use(bodyParser.json());
app.use(cors())

passport.use(new Strategy((username, password, cb) => {
    db.query('SELECT idUser, username, password FROM users WHERE username = ?', [username]).then(dbResults => {
  
      if(dbResults.length == 0)
      {
        return cb(null, false);
      }
  
      bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
        if(bcryptResult == true)
        {
          cb(null, dbResults[0]);
        }
        else
        {
          return cb(null, false);
        }
      })
  
    }).catch(dbError => cb(dbError))
  }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.get('/getData', (req, res) =>{
    db.query('SELECT * FROM stations').then(results => {
        res.json(results)
    })
    .catch(() => {
        res.sendStatus(500);
    })  
});
    
  app.get('/signIn',
  passport.authenticate('basic', { session: false }),
   (req, res) => res.send(true));

  

app.post('/signUp', (req, res) =>{
    
    let username = req.body.username.trim();
    let password = req.body.password.trim();
    let email = req.body.email.trim();
    if((typeof username === "string") &&
    (username.length > 3) &&
    (typeof password === "string") &&
    (password.length > 3))
 {
   bcrypt.hash(password, saltRounds).then(hash =>
     db.query('INSERT INTO users (username, password, email) VALUES (?,?,?)', [username, hash, email])
   )
   .then(dbResults => {
       console.log(dbResults);
       res.sendStatus(201);
   })
   .catch(error => res.sendStatus(500));
 }
 else {
   console.log("incorrect username or password, both must be strings and username more than 4 long and password more than 6 characters long");
   res.sendStatus(400);
 }   
});

app.patch('/changeData', (req, res) =>{
    //  отправлять промисы после выполнения лупы
        let data = req.body;
        Promise.all( [
        data.forEach(element => {
             db.query('UPDATE data SET name = (?), description = (?) , company = (?), price = (?), currency = (?), ship = (?), image = (?) WHERE data.id =(?)', [element.name, element.description, element.company, element.price, element.currency, element.ship, element.image, element.id])
        })]
        ).then((response) => {
            res.send('succesfull');
        })
        .catch((err) => {
            console.log(err);
            // res.send(err);
        })          
    });
// Do not accept "delete" request

Promise.all(    
    [
        db.query("CREATE TABLE IF NOT EXISTS stations(`stationId` INT NOT NULL AUTO_INCREMENT , `stationName` TEXT NOT NULL , `address` TEXT NOT NULL ,`lat` float(50) NOT NULL , `lng` float(50) NOT NULL, `type` varchar(50) NOT NULL , `price` varchar(50) NOT NULL , `measure` TEXT NOT NULL , `isTaken` BOOLEAN NOT NULL DEFAULT FALSE, `UUID` VARCHAR(4) NOT NULL, PRIMARY KEY (`stationId`))"),
        db.query("CREATE TABLE IF NOT EXISTS users ( `idUser` INT NOT NULL AUTO_INCREMENT , `username` varchar(50) NOT NULL , `email` varchar(50) NOT NULL , `password` varchar(512) NOT NULL , PRIMARY KEY (`idUser`))")
        // Add more table create statements if you need more tables
    ]
).then(() => {
    console.log('database initialized');
    app.listen(port, () => {
           console.log('Listening to port ', port)

    });
});

app.post('/addData', (req, res) =>{
//  отправлять промисы после выполнения лупы
    let data = req.body;
    Promise.all( [
    data.forEach(element => {
         db.query('INSERT INTO stations (stationName, address, lat, lng, type, price, measure, UUID) VALUES (?,?,?,?,?,?,?,?)', [element.stationName, element.address, element.lat, element.lng, element.type, element.price, element.measure, element.UUID])
    })]
    ).then((response) => {
        res.send('succesfull');
    })
    .catch((err) => {
        console.log(err);
        // res.send(err);
    })          
});