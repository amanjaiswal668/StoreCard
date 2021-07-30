//Declearation of Constants and required fields.

var express = require("express");
var bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect("mongodb+srv://admin-amanjaiswal:Wf8MqdjZCigmQGE1@storecluster01.nt1nr.mongodb.net/papa", { useNewUrlParser: true });

// Schema

const itemSchema = new Schema({
    department: String,
    product: [
        {
            productName: [String],
            productQuantity: [String]
        }
    ],
    voucher: Number
});

const userSchema = new Schema({
    email: String,
    password: String
})

const Item = mongoose.model("Item", itemSchema);

const User = mongoose.model("User", userSchema);
// -------------------------------------------------------------------------------------------------------------------
// CRUD Operations start.

// Access the homepage of the API.
app.get("/", function (req, res, err) {
    res.render("admin");

});


// Admin Verification.

// Signup Admin

app.get("/register", function (req, res, err) {
    res.render("adminRegistration");

});

app.post("/signup", function (req, res) {

    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    newUser.save(function (err) {
        if (err) {
            res.send("Error creating Admin.");
        } else {
            res.send("Admin Created Successfully.");
        }
    });
});


// Login as Admin

app.post("/login", function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }, function (err, foundUser) {
        if (err) {
            res.send("Error login the User. Please try again.")
        } else {
            if (foundUser) {
                if (foundUser.password = password) {
                    res.render("index");
                } else {
                    res.send("Invalid password.")
                }
            }else{
                res.send("Invalid user.")
            }
        }
    });
});


//  ---- CREATE ----

// ================================NoSQL(MongoDB)=========================================

app.post("/adddata", function (req, res, next) {
    req.body.product = [];
    for (i = 0; i < req.body['product.productQuantity'].length; i++) {
        const product = {
            productName: req.body['product.productName'][i],

            productQuantity: req.body['product.productQuantity'][i]

        }
        req.body.product.push(product);
    }
    const item = new Item(req.body);
    item.save(function (err) {
        if (!err) {
            res.redirect("index");
        } else {
            res.send(err);
        }
    });
});

// Get all data from the database.

app.get("/alldata", function (req, res) {
    Item.find({}, function (err, foundItems) {
        if (!err) {
            res.render("input", { userData: foundItems });
        } else {
            res.send(err);
        }
    });
})

// CRUD Operations end.

// Securely connected to the server.


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log("App listening to port 3000.")
});