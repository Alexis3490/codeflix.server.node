function router()
{
    //objet stock the path
    var access_router = {};

    //recover the url
    var match = function(req)
    {
        var router = access_router[req.url];
        return router;
    }

    //verification path great router
    var get = function(path,router)
    {
        access_router[path] = router ;
    }

    return {get:get,match:match}
}

module.exports = router()