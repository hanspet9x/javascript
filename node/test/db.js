const mongoose = require('mongoose');

let db = mongoose.createConnection("localhost", "test");
db.on("error", ()=>console.log("Error occured."));

db.once("open", ()=> {
    let Schema = new mongoose.Schema({name: String});
    let Model = mon
})
