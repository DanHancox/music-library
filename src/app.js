const express = require('express');
const app = express();
app.use = (express.json());

app.get('/', (_req ,res) => {
    res.send('Hello World');
    res.sendStatus(200);
});











module.exports = app;