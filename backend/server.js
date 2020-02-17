const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let Vendor = require('./models/vendor');
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
    Item.find(function(err, items) {
        if (err) {
            console.log(err);
        } else {
            res.json(items);
        }
    });
});

userRoutes.route('/login').post(function(req, res) {
    Vendor.findOne({'username': req.body.username})
        .then(vendor => {
            if (vendor){
            res.status(200).json({'Item': 'Item added successfully'});
            }
            else
                res.status(200).json({'Item': 'Item failed'});

        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Adding a new user            res.status(200).json({'Item': 'Item added successfully'});

userRoutes.route('/additem').post(function(req, res) {
    let item = new Item(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'Item': 'Item added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});


userRoutes.route('/addvendor').post(function(req, res) {
    let vendor = new Vendor(req.body);
    vendor.save()
        .then(vendor => {
            res.status(200).json({'Vendor': 'Vendor added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

userRoutes.route('/addorder').post(function(req, res) {
    let order = new Order(req.body);
    order.save()
        .then(order => {
            res.status(200).json({'Order': 'Order added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});



// // Getting a user by id
// userRoutes.route('/:id').get(function(req, res) {
//     let id = req.params.id;
//     User.findById(id, function(err, user) {
//         res.json(user);
//     });
// });

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
