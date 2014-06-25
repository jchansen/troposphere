define(
  [
    'underscore',
    'backbone',
    'globals',
    'models/Machine',
    'collections/MachineCollection'
  ],
  function (_, Backbone, globals, Machine, MachineCollection) {

    return Backbone.Model.extend({

      urlRoot: globals.API_ROOT + "/application",

      url: function () {
        var url = Backbone.Model.prototype.url.apply(this) + globals.slash();
        return url;
      },

      parse: function (response) {
        var attributes = response;
        attributes.id = response.uuid;
        attributes.votes = {
          up: Math.floor(Math.random() * 100),
          down: Math.floor(Math.random() * 100)
        };
        attributes.isFavorited = response.is_bookmarked;
        var machines = _.map(attributes.machines, function (attrs) {
          return new Machine(Machine.prototype.parse(attrs));
        });
        attributes.machines = new MachineCollection(machines);
        return attributes;
      },

      toJSON: function (options) {
        var attributes = _.clone(this.attributes);
        attributes.is_bookmarked = attributes.isFavorited;
        delete attributes['isFavorited'];
        return attributes;
      },

      computed: {
        name_or_id: function () {
          return this.get('name') || this.get('id');
        }
      },

      favorited: function(isFavorited){
        var actionUrl = globals.API_ROOT + "/bookmark/application/" + this.id + globals.slash();
        var data = {
          marked: isFavorited
        };

        var promise = $.ajax({
          url: actionUrl,
          type: "PUT",
          data: JSON.stringify(data),
          dataType: "json"
        });
        return promise;
      },

      /*
       * Here, were override the get method to allow lazy-loading of computed
       * attributes
       */
      get: function (attr) {
        if (typeof this.computed !== "undefined" && typeof this.computed[attr] === 'function') {
          return this.computed[attr].call(this);
        }
        return Backbone.Model.prototype.get.call(this, attr);
      }

    });

  });
