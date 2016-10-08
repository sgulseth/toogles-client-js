const test = require('ava');

const Toogles = require('../src/node');

test('Can init Toogles client in node', t => {
    const toogles = Toogles('https://example.com');

    t.true(toogles instanceof Toogles);
});