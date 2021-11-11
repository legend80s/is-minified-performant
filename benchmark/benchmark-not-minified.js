const fs = require('fs');
const path = require('path');

const Benchmark = require('Benchmark');

const { isMinified } = require('..');
const { isCodeUglified } = require('is-uglified');
const isMinifiedUsingRegexp = require('is-minified');
const isMinifiedUsingRegexpAndMedian = require('is-minified-code');

const suite = new Benchmark.Suite;

const source = fs.readFileSync(path.join(__dirname, '../test/assets/react.development.js'), 'utf-8');

// add tests
suite.add('is-minified-performant#isMinified', function() {
  isMinified(source);
})
.add('is-uglified#isCodeUglified', function() {
  isCodeUglified(source);
})
.add('is-minified#isMinifiedUsingRegexp', function() {
  isMinifiedUsingRegexp(source);
})
.add('is-minified-code#isMinifiedUsingRegexpAndMedian', function() {
  isMinifiedUsingRegexpAndMedian(source);
})

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Check react.development.js not minified: the fastest is ' + this.filter('fastest').map('name'));
})

// run async
.run({ 'async': true });
