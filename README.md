<h1 align="center">is-minified-performant 🚀</h1>

<p align="center">Checks if JS code is minified or uglified performantly.</p>

<h2 align="center">Usage</h2>

```javascript
import { isMinified } from 'is-minified-performant';
```

```javascript
const source2 = `!function(e){function t(r){if(n[r])return n[r].exports;for(var i=[],o=0;o<256;++o)i[o]=(o+256).toString(16).substr(1);e.exports=r}};`;

isMinified(source) // true
```

```javascript
const source1 = `
function main(foo = '') {
}
const bar = 1;
`;

isMinified(source) // false
```

<h2 align="center">How It Works</h2>

Use "Duck Typing" to detect whether source code is minified.

- no space before `return`
- no space before and after `if` or `else`
- no space before and after `=`
- no space before and after `var`

> Duck typing in computer programming is an application of the duck test—"If it walks like a duck and it quacks like a duck, then it must be a duck"—In duck typing, an object's suitability is determined by the presence of certain methods and properties, rather than the type of the object itself.
>
> From [wiki/Duck_typing](https://en.wikipedia.org/wiki/Duck_typing)


<h2 align="center">Why the Package</h2>

I tried [is-uglified](https://github.com/RaoHai/is-uglified) which uses acorn parse, [is-minified](https://www.npmjs.com/package/is-minified) using RegExp, and [is-minified-code](https://www.npmjs.com/package/is-minified-code) using RegExp and sort, and finally found "Duck Typing" is the most **performant 🚀** and efficient detect method and the correctness not lower than the above ones.

<h3 align="center">Benchmark Results</h3>

The speed of checking minified source code **17 times** the second.

The speed of checking un-minified source code **1.4 times** the second.

> Use [react.development.js@17.0.2](https://unpkg.com/react@17.0.2/umd/react.development.js) and [react.production.min.js@17.0.2](https://unpkg.com/react@17.0.2/umd/react.production.min.js) as the targeting test source code.

`npm run benchmark-minified`:

```
is-minified-performant#isMinified x 4,270,443 ops/sec ±1.58% (89 runs sampled)
is-uglified#isCodeUglified x 412 ops/sec ±5.71% (76 runs sampled)
is-minified#isMinifiedUsingRegexp x 240,459 ops/sec ±1.90% (88 runs sampled)
is-minified-code#isMinifiedUsingRegexpAndMedian x 81,651 ops/sec ±2.14% (87 runs sampled)

Check react.production.min.js minified: the fastest is is-minified-performant#isMinified
```

`npm run benchmark-not-minified`:

```
is-minified-performant#isMinified x 35,459 ops/sec ±0.97% (87 runs sampled)
is-uglified#isCodeUglified x 163 ops/sec ±3.73% (77 runs sampled)
is-minified#isMinifiedUsingRegexp x 25,229 ops/sec ±3.10% (84 runs sampled)
is-minified-code#isMinifiedUsingRegexpAndMedian x 881 ops/sec ±2.40% (81 runs sampled)

Check react.development.js not minified: the fastest is is-minified-performant#isMinified
```
