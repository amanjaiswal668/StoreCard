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
            productName: String,
            productQuantity: String
        }
    ],
    voucher: String
});

const Item = mongoose.model("Item", itemSchema);
// -------------------------------------------------------------------------------------------------------------------
// CRUD Operations start.

// Access the homepage of the API.
app.get("/", function (req, res) {
    console.log(1);
    res.render("index");
});

//  ---- CREATE ----

// ================================NoSQL(MongoDB)=========================================

app.post("/adddata", function (req, res, next) {
    console.log(2);
    const item = new Item(req.body);
    console.log(item);
    item.save();
    res.send("Success")

});

app.get("/alldata", function (req, res) {
    console.log(3);

    Item.find({}, function (err, foundItems) {
        res.render("table", { userData: foundItems });
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