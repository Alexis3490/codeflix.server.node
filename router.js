function router()
{
    //objet stock the path
    const access_router = {};

    //recover the url
    const match = function(req)
    {
        const router = access_router[req.url];
        return router;
    }

    //verification path great router
    const get = function(path,router) {
        access_router[path] = router;
    }

    //verification path great router
    const post = function(path,router) {
        access_router[path] = router;
        return path
    }

    //verification path great router
    const put = function(path,router) {
        access_router[path] = router;
    }

    //verification path great router
    const del= function(path,router) {
        access_router[path] = router;
    }
    return {get:get,post:post,put:put,del:del,match:match}
}

module.exports = router()