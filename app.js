const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://localhost:27017/contactDance");
}
// const port = 80;

// define mongoose schema

const contactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Description: String,
    Address: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Express specific stuff

app.use("/static", express.static("static"));
app.use(express.urlencoded());

// Pug Specific Files

app.set("view engine", "pug"); // sets the template engine as pug
app.set("views", path.join(__dirname, "views")); // set the views directory

// ENDPOINTS

app.get("/home", (req, res) => {
    res.status(200).render("home.pug");
});

app.get("/", (req, res) => {
    res.render("index.pug");
});

app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});
app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {

            res.send("this item has been sent to thte databsase")
        }).catch(() => {
            res.send("item was not sent")
        })
        // res.status(200).render("contact.pug", params);
});




// START THE SERVER

app.listen(port, () => {
    console.log(`this application started succesfully on port ${port}`);
});