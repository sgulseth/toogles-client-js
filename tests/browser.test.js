const test = require('ava');

const fetchMock = require('fetch-mock');
Object.assign = undefined;
global.window = {
    fetch: fetchMock.fetchMock
};

const Toogles = require('../src/browser');

test('Can init Toogles client in browser', t => {
    const toogles = Toogles('https://example.com', {
        headers: {
            'X-Auth': 'Auth'
        }
    });

    t.true(toogles instanceof Toogles);
});