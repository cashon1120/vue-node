const http = require('http')
const url = require('url')
const util = require('util')
const fs = require('fs')
const port = 3000
const hostname = '127.0.0.1';
const server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname;
    fs.readFile(pathName.substring(1), (error,data) => {
        if (error) {
            res.writeHead(404, {
                'Content-Type': 'text/html'
            })
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            res.write(data.toString())
        }
        res.end()
    })
}).listen(port, hostname, () => {
    console.log(`服务器已经运行，请打开浏览器，输入:${hostname}:${port}访问`)
})
