const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

app = express();

app.use(bodyParser.urlencoded({ extended: false }));

let username;

app.use('/login', (req, res, next) => {
    res.send(`<form onsubmit="localStorage.setItem('username', document.getElementById('username').value)" action="/" method="POST">
                <input id="username" type="text" name="title">
                <button type="submit">add</button>
            </form > `);
})


app.use('/', (req, res, next) => {
    const form = `<form method="POST" action="/" onsubmit="{document.getElementById('formUsername').value = localStorage.getItem('username')}"><input type="hidden" id="formUsername" name="formUsername"><input type="test" name="msg" /><button type="submit">Send</button></form >`;
    if (req.body.formUsername || req.body.title) {
        const nameAndMessage = " " + req.body.formUsername + " : " + (req.body.msg);
        fs.readFile('messages.txt', 'utf8', (err, data) => {
            if (data) {
                if (req.body.msg) {
                    fs.appendFileSync('messages.txt', nameAndMessage);
                    res.send(`<p>${data + " " + nameAndMessage}</p>${form}`);
                } else {
                    res.send(`<p>${data}</p>${form}`);
                }
            } else {
                if (req.body.msg) {
                    fs.appendFileSync('messages.txt', nameAndMessage);
                    res.send(`<p>${data + " " + nameAndMessage}</p>${form}`);
                } else {
                    res.send(`<p></p>${form}`);
                }
            }
        })
    } else {
        res.send(`<p>Please Login</p>${form}`);
    }
});

app.listen('4000');

