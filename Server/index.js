const express = require('express');
const app = express();

const port = 4000;
const bodyParser = require('body-parser');
var cors = require('cors');
const db = require('./db');

app.use(bodyParser.json());
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
app.post('/signUp', (req, res) =>{
    let data = req.body;
    console.log(data);
    // Promise.all( [
    // data.forEach(element => {
    //      db.query('INSERT INTO data (name, description, company, price, currency, ship, image) VALUES (?,?,?,?,?,?,?)', [element.name, element.description, element.company, element.price, element.currency, element.ship, element.image])
    // })]
    // ).then((response) => {
    //     res.send('succesfull');
    // })
    // .catch((err) => {
    //     console.log(err);
    //     // res.send(err);
    // })          
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
app.patch('/deleteData', (req, res) =>{
        //  отправлять промисы после выполнения лупы
            let data = req.body;
            // console.log(data);
            Promise.all( [
            data.forEach(element => {
                 db.query('DELETE FROM `data` WHERE `data`.`id` = (?)', [element.id])
            })]
            ).then((response) => {
                res.send('succesfull');
            })
            .catch((err) => {
                console.log(err);
                // res.send(err);
            })          
        });
// DB init 
Promise.all(    
    [
        db.query("CREATE TABLE IF NOT EXISTS stations(`stationId` INT NOT NULL AUTO_INCREMENT , `stationName` TEXT NOT NULL , `address` TEXT NOT NULL ,`lat` float(50) NOT NULL , `lng` float(50) NOT NULL, `type` varchar(50) NOT NULL , `price` varchar(50) NOT NULL , `measure` TEXT NOT NULL , PRIMARY KEY (`stationId`))"),
        db.query("CREATE TABLE IF NOT EXISTS users ( `idUser` INT NOT NULL AUTO_INCREMENT , `nickname` varchar(50) NOT NULL , `email` varchar(50) NOT NULL , `password` varchar(512) NOT NULL , PRIMARY KEY (`idUser`))")
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
         db.query('INSERT INTO stations (stationName, address, lat, lng, type, price, measure) VALUES (?,?,?,?,?,?,?)', [element.stationName, element.address, element.lat, element.lng, element.type, element.price, element.measure])
    })]
    ).then((response) => {
        res.send('succesfull');
    })
    .catch((err) => {
        console.log(err);
        // res.send(err);
    })          
});