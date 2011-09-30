var vows = require('vows'),
    assert = require('assert');

var travis = require('../lib/travis-api-wrapper');


// This is currently a real live test, as opposed to some kind of mocked travis-ci.org situation
// The reason to do it this way is pure and simple: It's easier, and this thing is tiny, if I get
// to the point of having a problem with it, and it's painful enough, then sure, I'll mock it, but
// for now, I usually code live on the net anyway.

// The repository we will test with
var our_repo = 'cmaujean/travis-api-wrapper';

vows.describe('travis-api-wrapper').addBatch({
    'repositories': { 
      topic: function () {
        travis.repositories(this.callback);
      },
      'returns a set of repositories': function(err, data) {
          assert.isNull(err);
          assert.isArray(data);
          assert.isNotZero(data.length);
      },
    },
    'repository': {
      topic: function () {
        travis.repository(our_repo, this.callback);
      },
      'returns a single repository': function(err, data) {
        assert.isNull(err);
        assert.equal(our_repo, data.slug);
      }
    },
    'builds': {
      topic: function() {
        travis.builds(our_repo, this.callback);
      },
      'returns a set of builds': function(err, data) {
        assert.isNull(err);
        assert.isNotNull(data);
        assert.equal(data[0].repository_id, 2199);
      }
    },
    'build': {
      topic: function() {
        travis.build(our_repo, 156500, this.callback);
      },
      'returns a single build': function(err, data) {
        assert.isNull(err);
        assert.isNotNull(data);
        assert.equal(156500, data.id);
      
      }
    },
    // 'error': {
    //       topic: function() {
    //         var oldhost = travis.options.host;
    //         travis.options.host = "example.com";
    //         travis.repositories(this.callback)
    //         travis.options.host = oldhost;
    //       },
    //       'provides an error message': function(err, data) {
    //         assert.isNull(data);
    //         assert.isNotNull(err);
    //       }
    //     }
}).export(module);
