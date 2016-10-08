# Toogles Client for JavaScript/NodeJS

This is a javascript client to be used with the [Toogles Feature flag service](https://github.com/sgulseth/toogles). It can be used both on the client and on the server. It's a simple wrapper around [node-fetch](https://github.com/bitinn/node-fetch) in NodeJS and the [Fetch API](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) in the browser.

## Getting started

```
const Toogles = require('toogles-client');

const toogles = new Toogles('http://server.running.toogles');

toogles.includes('some-feature').then(function(someFeature) {
  if (someFeature) {
    // Render something to the users that has someFeature-flag set
  } else {
    // Render something else to the users that doesn't someFeature-flag set
  }
});

toogles.includes(['some-feature', 'some-other-feature']).then(function(features) {
  ....
});
```

### Node js
`$ npm install --save toogles-client`

### Browser

Download the latest release from this repository and include it in your application with `<script>`. To support older browser you must include polyfills for Promise and fetch.

  * [https://github.com/github/fetch](https://github.com/github/fetch)
  * [https://github.com/stefanpenner/es6-promise](https://github.com/stefanpenner/es6-promise)


## API

### `new Toogles(URL, config)`

#### URL - String
 Url to a toogles endpoint

#### config - Object
```
{
   headers: {
        someHeader: 'to-send'
   }
}
```

### `Toogles.includes(feature) -> Promise`

#### feature - String/Array
If a string is provided a Boolean is returned.
If an array is provided an object with feature as key and flag(boolean) as the value:

*Example:*

```
Toogles.includes(feature1).then(function(feature1) {
  // feature1 = true/false
});

Toogles.includes(['feature1', 'feature2']).then(function(flags) {
  // flags = {
  //    feature1: true/false,
  //    feature2: true/false
  // }
});
```

If another type than String or Array is provided it will reject.

### `Toogles.has(feature) -> Toogles.includes(feature)`
### `Toogles.feature(feature) -> Toogles.includes(feature)`