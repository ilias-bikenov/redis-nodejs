const buildCacheKey = require("../../src/utils/cache.js")

describe("Cache", () => {
    describe("buildCacheKey", () => {
        test('Should return correct result', () => {
            const cacheKey = buildCacheKey('products', 'some', 'other', 'parts')
            expect(cacheKey).toBe('products-some-other-parts');
        });

    });

});