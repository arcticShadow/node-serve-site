#! /usr/bin/env node
require('colors');
var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var argv = require('minimist')(process.argv.slice(2));

var port = argv.port || (process.env.PORT || 8080);
var dir = argv.dir || 'dist';

if(argv.help !== undefined || argv.h !== undefined) {
    console.log('Help'.yellow.underline);
    console.log('');
    console.log('Options');
    console.log('--help (-h) \t\tShows this Help');
    console.log('--port \t\t\tThe port to listen on. Defaults to process.env.PORT');
    console.log('--dir \t\t\tThe dir to serve. Defaults to \'dist\'');
    console.log('');

    process.exit();
}


// Serve up public/ftp folder
var serve = serveStatic(dir, {'index': ['index.html', 'index.htm']});

// Create server
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res);
  console.log(req.method, req.url);
  serve(req, res, done);
})

console.log('Server Listening on: '.green + 'http://0.0.0.0:'.yellow + String(port).red)
// Listen
server.listen(port);
