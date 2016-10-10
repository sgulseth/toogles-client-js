if (typeof(Object.assign) !== 'function') {
    Object.assign = function (target) {
        var output = Object(target);
        var len = arguments.length;

        for (var index = 1; index < len; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
}

module.exports = require('./client')(window.fetch);
