require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected");
    })
    .catch(err => {
        console.log(err);
    });

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    phone: String
});

const Person = mongoose.model("Person", personSchema);

app.post("/addPerson", async (req, res) => {

    try {

        const person = new Person(req.body);

        await person.save();

        res.json({
            message: "Data Saved Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

app.get("/getPersons", async (req, res) => {

    const persons = await Person.find();

    res.json(persons);

});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running at http://localhost:3000");
}); 