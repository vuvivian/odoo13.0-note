/*
 * @Author: your name
 * @Date: 2020-04-06 15:51:39
 * @LastEditTime: 2020-04-06 22:54:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /express_demo/server.js
 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config/keys').mongoURI;
const app = express();
const port = process.env.PORT || 4000;
const passport = require('passport');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());


require('./config/passport')(passport);

const users = require('./routes/api/users');
app.use('/api/users', users);


mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true }).then(() =>{
    console.log('succ')
}).catch(err => {
    console.log(err)
})

app.listen(port, ()=>{
    console.log(`server ${port}`)
})