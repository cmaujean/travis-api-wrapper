var vows = require('vows'),
    assert = require('assert');

var travis = require('travis-node');

// The repository we will test with
var our_repo = 'cmaujean/travis-node';

vows.describe('travis-node').addBatch({
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
      assert.equal(data[0].repository_id, 2182);
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
  }
}).export(module);