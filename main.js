const express = require('./my-express');
const app = express();

app.get("/",function(req,res)
{
    res.send('Hello World');
});

app.get("/hello",function(req,res)
{
    res.send('Hello people');
});

app.listen(3000);