const mongoose = require('mongoose')
// const uri = 'mongodb://127.0.0.1:27017/';
const uri = 'mongodb+srv://arunrajshanker6:Mkmkmk9090@cluster0.mrqldhf.mongodb.net/?retryWrites=true&w=majority';
// mongodb+srv://arunrajshanker6:<password>@cluster0.mrqldhf.mongodb.net/?retryWrites=true&w=majority

const connection = mongoose.connect(uri);
module.express = {connection}