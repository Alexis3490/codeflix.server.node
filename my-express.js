var http = require('http');
var url = require('url');
var router = require('./router');

var response = require('./response.js');

function express()
{
    //creation of server
    var server = http.createServer(function(req, res) {

        //different function res in the get method
        response(res);

        //rescover the url of the server
        var path = router.match(req);

        //verification if path exist
        if(path){

            path(req,res)
        }
        else
        {
            res.send('Path not found');

        }
    });

    //server listenning port
    var listen = function(port){
        server.listen(port);
        console.log("listening on port : " , port);
    }
    return {listen:listen, get:routes.get}

}
module.exports = express;
