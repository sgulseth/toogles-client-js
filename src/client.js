var objectAssign = require('object-assign');

module.exports = function(fetch) {
    var defaultHeaders = {
        'Accept': 'application/json'
    };

    function Toogles(apiUrl, config) {
        if (!(this instanceof Toogles)) {
            return new Toogles(apiUrl, config);
        }

        this.apiUrl = apiUrl;
        this.config = config || {};
        this.headers = objectAssign(defaultHeaders, this.config.headers);
        this.features = null;
    }

    Toogles.prototype.includes = function(feature) {
        if (this.features === null) {
            return this.fetch().then(function() {
                return this.includes(feature);
            }.bind(this));
        }

        if (typeof(feature) === 'number') {
            feature = String(feature);
        }

        if (typeof(feature) === 'string') {
            return Promise.resolve(this.features.indexOf(feature) !== -1);
        } else if (typeof(feature) === 'object' && feature.length) {
            var features = feature.reduce(function(map, f) {
                map[f] = this.features.indexOf(f) !== -1;

                return map;
            }.bind(this), {});

            return Promise.resolve(features);
        } else {
            return Promise.reject('Unknown type supplied to Toogles.includes:' + typeof(feature));
        }
    };

    Toogles.prototype.fetch = function() {
        return fetch(this.apiUrl, {
            headers: this.headers
        }).then(function(response) {
            return response.json();
        }).then(function(features) {
            this.features = features;
        }.bind(this));
    };

    return Toogles;
}