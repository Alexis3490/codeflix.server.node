const express = require('./my-express');
const app = express();

app.get("/api/customers",function(req,res)
{
    res.send('get reussit');
});

app.post("/api/customers",function(req,res)
{
    res.send('post reussit');
});

app.put("/api/customers/:id",function(req,res)
{
    res.send('put reussit');
});

app.delete("/api/customers/",function (req,res)
{
    res.send('delete reussit');
})

app.render('/render', { name: 'antoine' }, (err, html) => {
    res.write(html);
})


app.listen(3400);