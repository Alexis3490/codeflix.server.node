const http = require('http');
const url = require('url');
const fs = require("fs");

const LOCAL_DATABASE = "students.json";
const filename= "html.mustache";

const router = require('./router');
const response = require('./response');

function express()
{
    //creation of server
    const server = http.createServer(function(req, res) {

        //different function res in the get method
        response(res);

        //rescover the url of the server
        const path = router.match(req);

        if(path)
        {
            path(req,res);
        }

        if (req.method === "POST") {
                let body = "";
                req.on("data", chunk => {
                    body += chunk.toString();
                });

                req.on("end", () => {
                    console.log(req.headers);
                    const user = JSON.parse(body);

                    let data;
                    if (!fs.existsSync(LOCAL_DATABASE)) {
                        user.id = 1;
                        data = [user];
                    } else {
                        const json = require(`./${LOCAL_DATABASE}`);
                        user.id = json.length + 1;
                        json.push(user);
                        data = json;
                    }

                    fs.writeFileSync(LOCAL_DATABASE, JSON.stringify(data, null, 4));
                });
                // 2 fiche system managment
        }
        const { pathname, query } = url.parse(req.url, true);

        if(req.method === "PUT") {
                let splitPathname = pathname.split('/')
                let putId = splitPathname[2]
                let matchPut = []
                let json = ""
                let data = ''
                req.on('data', chunk => {
                    data += chunk.toString()
                })
                req.on('end', () => {
                    let putData = JSON.parse(data)
                    let putName = putData.name
                    let putSchool = putData.school
                    let isExist = false
                    matchPut = putId.match(/(^[0-9]+$)/g)
                    if (matchPut != null) {
                        putId = parseInt(matchPut[0])
                        if (fs.existsSync(LOCAL_DATABASE)) {
                            json = require(`./${LOCAL_DATABASE}`)
                            for (const k in json) {
                                if (json[k].id == putId) {
                                    isExist = true
                                }
                            }
                            if (isExist == true) {
                                for (const key in json) {
                                    if (json[key].id == putId) {
                                        if (putName != undefined) {
                                            json[key].name = putName
                                        }
                                        if (putSchool != undefined) {
                                            json[key].school = putSchool
                                        }
                                        fs.writeFileSync(LOCAL_DB, JSON.stringify(json, null, 4))
                                    }
                                }
                            } else {
                                return `<h1>ID ${putId} NON EXISTANT</h1>`
                            }
                        }
                    } else {
                        return `<h1>ID ${putId} IS NOT A NUMBER</h1>`
                    }
                })
                return (`<h1>Put réussie!</h1>`)
        }

        if(req.method === "DELETE") {
            if (fs.existsSync(LOCAL_DATABASE)) {
                fs.writeFileSync(LOCAL_DATABASE, JSON.stringify([], null, 4))
                return (`<h1>Delete réussie!</h1>`)
            } else {
                return (`<h1>Delete échoué!</h1>`)
            }
        }

        });

    const render = function(path, objName, callback) {
        let regex = /({{[\w]+}})/g;
        let content = ''
        let erreur = undefined
        if (!fs.existsSync(filename)) {
            erreur = `The file ${filename} does not exist.`;
        } else {
            content = '' + fs.readFileSync(`./${filename}`)
            if(objName !== "")
            {
                content = content.replace(regex, objName.name);
            }
       }
        callback(erreur, content)
    }

    //server listenning port
    const listen = function(port){
        server.listen(port);
        console.log("listening on port : " , port);
    }
    return {listen:listen, get:router.get, post:router.post, put:router.put, delete:router.del, render:render}
}
module.exports = express