const http = require('http');
const url = require('url');
const fs = require("fs");

const LOCAL_DATABASE = "students.json";

const router = require('./router');
const response = require('./response.js');

function express()
{
    //creation of server
    const server = http.createServer(function(req, res) {

        //different function res in the get method
        response(res);

        //rescover the url of the server
        const path = router.match(req);

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
    const listen = function(port){
        server.listen(port);
        console.log("listening on port : " , port);
    }
    return {listen:listen, get:router.get, }

}
module.exports = express;
