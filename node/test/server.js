const express = require('express');
const routes = require('./routes');
const mongo = require('./mongo');
const app = express();
const hpi = mongo("Test");

const bcrpt = require('bcryptjs');



app.use('/', routes);


app.listen(3001, ()=>{
    console.log(bcrpt.compareSync("ade", "$2a$10$dMoBK2EW1EqKGFqj39sHGOn2VvsYN60swQaehlZimJPtWYud0kqvm"));
    console.log("Server running");
    hpi.createTable("tablee");
});