function response(res)
{
    // send a message
    res.send = function(body)
    {
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Length', body.length);
        res.writeHead(300);
        res.end(body);
    }

    // send a message in the format json
    res.json = function(body)
    {    body = JSON.stringify(body);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', body.length);
        res.writeHead(200);
        res.end(body);
    }

    //redirection of url to new url
    res.redirect = function(url)
    {
        res.setHeader('Location', url);
        res.writeHead(301)
        res.end();
    }

    return res;
}

module.exports = response;