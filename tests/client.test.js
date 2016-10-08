const test = require('ava');

const fetchMock = require('fetch-mock');
const Toogles = require('../src/client')(fetchMock.fetchMock);

const features = ['test1', 'test2', 'test3', '42'];

fetchMock.get('https://example.com', features);

test('Can init Toogles client', t => {
    const toogles = Toogles('https://example.com');

    t.true(toogles instanceof Toogles);
});

test('Can check feature flag', async t => {
    const toogles = Toogles('https://example.com');

    t.true(await toogles.includes('test1'), 'Has feature flag test1');
    t.false(await toogles.includes('some-feature'), 'Has not feature flag some-feature');
    t.deepEqual(await toogles.includes(['test2', 'some-feature', 'test3', 'test4']), {
        'test2': true,
        'some-feature': false,
        'test3': true,
        'test4': false
    }, 'Can check multiple flags and return an object');
    t.true(await toogles.includes(42), 'Casts flag to string and flag is set');
    t.throws(toogles.includes({}));
    t.throws(toogles.includes());

    // Aliases
    t.true(await toogles.has('test1'), 'Alias has: Has feature flag test1');
    t.true(await toogles.feature('test1'), 'Alias feature: Has feature flag test1');

    t.deepEqual(toogles.features, features);
});