const express = require('express');
const app = express();
const dotenv = require('dotenv');
const moongose = require('mongoose');
const todos = require('./routes/todos')
dotenv.config();

app.use('/static', express.static("public"));
app.use(express.urlencoded({extended: true}));
app.set('view engine', "ejs");

moongose.set("useFindAndModify", false);
moongose.connect(process.env.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('MongoDb COnnected')
})

app.use('/', todos)



app.listen(process.env.PORT || 3000, () => {console.log('Ready for Server') })