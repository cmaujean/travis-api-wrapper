var http = require('http');

var ua = "ci-bot - v0.01 - (cmaujean@gmail.com)";
var host = "travis-ci.org";
var port = 80;
var headers = {
    "user-agent": ua
};

// cback is a callback that accepts 2 parameters:
// cback(error, data)
exports.repositories = function(cback) {
    request = http.get({
        host: host,
        port: port,
        path: '/repositories.json',
        headers: headers,
    },
    function(response) {
        var body = "";

        response.on('data',
        function(chunk) {
            body += chunk;
        });

        response.on('error',
        function(e) {
            console.log('ERROR: There was an issue with the request: ' + e.message);
            cback(e.message, '');
        });

        response.on('end',
        function() {
            cback('', JSON.parse(body));
        });
    });
};

exports.repository = function(repo, cback) {
    request = http.get({
        host: host,
        port: port,
        path: '/' + repo + '.json',
        headers: headers,
    },
    function(response) {
        var body = "";

        response.on('data',
        function(chunk) {
            body += chunk;
        });

        response.on('error',
        function(e) {
            console.log('ERROR: There was an issue with the request: ' + e.message);
            cback(e.message, '');
        });

        response.on('end',
        function() {
            cback('', JSON.parse(body));
        });
    });
};

exports.builds = function(repo, cback) {
    request = http.get({
      host: host,
      port: port,
      path: '/' + repo + '/builds.json',
      headers: headers,
    },
    function(response) {
       var body = "";

        response.on('data',
        function(chunk) {
            body += chunk;
        });

        response.on('error',
        function(e) {
            console.log('ERROR: There was an issue with the request: ' + e.message);
            cback(e.message, '');
        });

        response.on('end',
        function() {
            cback('', JSON.parse(body));
        });
    });
};

exports.build = function(repo, id, cback) {
  request = http.get({
    host: host,
    port: port,
    path: '/' + repo + '/builds/' + id + '.json',
    headers: headers,
  },
  function(response) {
     var body = "";

      response.on('data',
      function(chunk) {
          body += chunk;
      });

      response.on('error',
      function(e) {
          console.log('ERROR: There was an issue with the request: ' + e.message);
          cback(e.message, '');
      });

      response.on('end',
      function() {
          cback('', JSON.parse(body));
      });
  });
};