var m = require('mithril');

module.exports = {
  builder: {
    apple: {
      type: 'apple'
    },
    flower: {
      type: 'flower'
    }
  },
  ctrl: function(items) {

    var get = function(key) {
      return items[key];
    };

    var list = function() {
      return Object.keys(items).map(get);
    };

    var hasType = function(type) {
      return function(item) {
        return item.type === type;
      };
    };

    return {
      get: get,
      withItem: function(key, f) {
        if (items[key]) return f(items[key]);
      },
      remove: function(key) {
        delete items[key];
      },
      hasOfType: function(type) {
        return !!list().filter(hasType(type))[0];
      },
      flowerKey: function() {
        for (var k in items)
          if (items[k].type === 'flower') return k;
      }
    };
  },
  view: function(item) {
    return m('item.' + item.type);
  }
};