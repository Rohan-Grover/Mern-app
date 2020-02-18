const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let User = require('./models/user');
let Item = require('./models/item');
let Order = require('./models/order');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/BigBuy', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/').get(function(req, res) {
    User.find(function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});


// Adding a new user
userRoutes.route('/adduser').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'User': 'User added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

userRoutes.route('/login').post(function(req, res) {
    User.findOne({'username': req.body.username})
        .then(user => {
            if(user){
                if(user.password == req.body.password)
                    res.status(200).json({'User': 'User Exists'});
                else
                    res.status(200).json({'User': 'Wrong Password'});
                    
            }
            else
                res.status(200).json({'User': 'User Does Not Exist'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});


app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});