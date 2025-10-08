import * as util from '@cmt/util';
import { expect } from '@test/util';

suite('Utils test', () => {
    test('Split path into elements', () => {
        const elems = util.splitPath('foo/bar/baz');
        expect(elems).to.eql(['foo', 'bar', 'baz']);
    });
    test('Split empty path', () => {
        const elems = util.splitPath('');
        expect(elems).to.eql([]);
    });
    test('Milliseconds to time span string', () => {
        const tests: [x: number, s: string][] = [
            [0, '00:00:00.000'],
            [1, '00:00:00.001'],
            [10, '00:00:00.010'],
            [100, '00:00:00.100'],
            [1000, '00:00:01.000'],
            [10000, '00:00:10.000'],
            [60000, '00:01:00.000'],
            [600000, '00:10:00.000'],
            [3600000, '01:00:00.000'],
            [36000000, '10:00:00.000'],
            [39599999, '10:59:59.999']
        ];
        for (const test of tests) {
            expect(util.msToString(test[0])).to.eq(test[1]);
        }
    });
    test('cmakeify should not escape semicolons in strings', () => {
        const result = util.cmakeify('libc;compiler-rt');
        expect(result.type).to.eq('STRING');
        expect(result.value).to.eq('libc;compiler-rt');
    });
    test('cmakeify should convert arrays to semicolon-separated strings', () => {
        const result = util.cmakeify(['libc', 'compiler-rt']);
        expect(result.type).to.eq('STRING');
        expect(result.value).to.eq('libc;compiler-rt');
    });
    test('cmakeify should convert booleans correctly', () => {
        const resultTrue = util.cmakeify(true);
        expect(resultTrue.type).to.eq('BOOL');
        expect(resultTrue.value).to.eq('TRUE');
        
        const resultFalse = util.cmakeify(false);
        expect(resultFalse.type).to.eq('BOOL');
        expect(resultFalse.value).to.eq('FALSE');
    });
    test('cmakeify should convert numbers to strings', () => {
        const result = util.cmakeify(42);
        expect(result.type).to.eq('STRING');
        expect(result.value).to.eq('42');
    });
});
