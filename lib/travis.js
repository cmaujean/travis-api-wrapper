var http = require('http');

// fetches the requested path from the host in opts and passes it to the callback
// @param opts = json object with keys: host, port, headers
// @param path = "somename/somerepo"
// @param cb = function(err, data) {...do something with data...};
function get_data(opts, path, cb) {
  opts.path = path;
  request = http.get(
    opts,
    function(response) {
      var body = "";

      response.on('data',
      function(chunk) {
          body += chunk;
      });

      response.on('error',
      function(e) {
          console.log('ERROR: There was an issue with the request to ' + path + ': ' + e.message);
          cback(e.message, '');
      });

      response.on('end',
      function() {
          cb('', JSON.parse(body));
      });
    });
}

exports.ua = "travis-node - v0.01 - (cmaujean@gmail.com)";
var options = {
  host: "travis-ci.org",
  port: 80,
  headers: {
      "user-agent": exports.ua
  }
}


// fetches data about all the repositories from travis-ci.org json api and passes it to the callback
// @param cb = function(err, data) {...do something with data...}; 
// @returns nothing
exports.repositories = function(cb) { get_data(options, '/repositories.json', cb) };

// fetches data about a particular repository from travis-ci.org json api and passes it to the callback
// @param repo = "name/repository";
// @param cb = function(err, data) {...do something with data...};
// @returns nothing
exports.repository = function(repo, cb) { get_data(options, '/' + repo + '.json', cb) };

// fetches data about all the builds for a given repository from travis-ci.org json api and passes it to the callback
// @param repo = "name/repository";
// @param cb = function(err, data) {...do something with data...};
// @returns nothing
exports.builds = function(repo, cb) { get_data(options, '/' + repo + '/builds.json', cb) };

// fetches data about a given build for a given repository from travis-ci.org json api and passes it to the callback
// @param cb = function(err, data) {...do something with data...};
// @param repo = "name/repository";
// @param id = somebuildid;
// @returns nothing
exports.build = function(repo, id, cb) { get_data(options, '/' + repo + '/builds/' + id + '.json', cb) };
