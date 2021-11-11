<h1 align="center">is-minified-performant 🚀</h1>

Checks if JS code is minified or uglified performantly.

## Usage

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

## How It Works

Use "Duck Typing" to detect whether source code is minified.

> Duck typing in computer programming is an application of the duck test—"If it walks like a duck and it quacks like a duck, then it must be a duck"—In duck typing, an object's suitability is determined by the presence of certain methods and properties, rather than the type of the object itself.
>
> From [wiki/Duck_typing](https://en.wikipedia.org/wiki/Duck_typing)

- no space before `return`
- no space before and after `if` or `else`
- no space before and after `=`
- no space before and after `var`

## Why the Package

I tried

- [is-uglified](https://github.com/RaoHai/is-uglified) - use acorn parse,

- [is-minified](https://www.npmjs.com/package/is-minified) - use RegExp,

- [is-minified-code](https://www.npmjs.com/package/is-minified-code) - use RegExp and sort,

but found "Duck Typing" is the most **performant 🚀** and efficient method and the correctness not lower than the above ones.

### Benchmark Results

1 Check  [react.development.js](https://unpkg.com/react@17.0.2/umd/react.development.js) not be minified. `npm run benchmark-not-minified`:

```
is-minified-performant#isMinified x 35,459 ops/sec ±0.97% (87 runs sampled)
is-uglified#isCodeUglified x 163 ops/sec ±3.73% (77 runs sampled)
is-minified#isMinifiedUsingRegexp x 25,229 ops/sec ±3.10% (84 runs sampled)
is-minified-code#isMinifiedUsingRegexpAndMedian x 881 ops/sec ±2.40% (81 runs sampled)

Check react.development.js not minified: the fastest is is-minified-performant#isMinified
```

This package's checking un-minified source code speed **1.4 times** the second.

2 Check  [react.production.min.js is](https://unpkg.com/react@17.0.2/umd/react.production.min.js) be minified. `npm run benchmark-minified`:

```
is-minified-performant#isMinified x 4,270,443 ops/sec ±1.58% (89 runs sampled)
is-uglified#isCodeUglified x 412 ops/sec ±5.71% (76 runs sampled)
is-minified#isMinifiedUsingRegexp x 240,459 ops/sec ±1.90% (88 runs sampled)
is-minified-code#isMinifiedUsingRegexpAndMedian x 81,651 ops/sec ±2.14% (87 runs sampled)

Check react.production.min.js minified: the fastest is is-minified-performant#isMinified
```

This package's checking minified source code speed **17 times** the second.
