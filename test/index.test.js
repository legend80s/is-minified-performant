const fs = require('fs');
const path = require('path');
const { isMinified } = require('..');

const NOT_MINIFIED_SOURCE_CODE_LIST = {
  0: `
function func(foo = '') {}
const bar = 1;
  `,

  1: `var $ = window.Zepto;
  var pageNo = 1;
  var hasNextPage = true;
  var pagingObject = null;

  /** 防重点击 */
  var clickLocked = false;
  // var testCount = 1;
  `,
}

const MINIFIED_SOURCE_CODE_LIST_IN_README = {
  '-1!==index&&0!==index': '-1 !== index && 0 !== index',
  'no space before return': 'function(){return sourceCode[index-1]}.toString()',
  'no space before if': '!function(){if(x){sourceCode[index-1]}}();',
  'no space before `=`': 'const o=sourceCode[index-1]',
  'no space before var': '{var o}',
}

// view-source:https://www.toptal.com/developers/javascript-minifier/
const MINIFIED_SOURCE_CODE_LIST = {
  0: `function main(n=""){}const bar=1;`,

  1: `!function(e){function t(r){if(n[r])return n[r].exports;for(var i=[],o=0;o<256;++o)i[o]=(o+256).toString(16).substr(1);e.exports=r}};`,

  2: `/*

  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
 */
  var h,aa=function(a){var b=0;return`,

  3: `
  // Copyright 2012 Google Inc. All rights reserved.
  /*
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  */
  var h,aa=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}},ba="function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b},ca;if("function"==typeof Object.setPrototypeOf)ca=Object.setPrototypeOf;else{var fa;a:{var ha={a:!0},ia={};try{ia.__proto__=ha;fa=ia.a;break a}catch(a){}fa=!1}ca=fa?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}
  `
}

describe('isMinified', () => {
  it('not minified: short', () => {
    const input = NOT_MINIFIED_SOURCE_CODE_LIST[0];
    const actual = isMinified(input);
    const expected = false;

    expect(actual).toEqual(expected);
  });

  it('not minified: long', () => {
    const input = NOT_MINIFIED_SOURCE_CODE_LIST[1];
    const actual = isMinified(input);
    const expected = false;

    expect(actual).toEqual(expected);
  });

  it('not minified: react.development.js', () => {
    // https://unpkg.com/react@17.0.2/umd/react.development.js
    const input = fs.readFileSync(path.join(__dirname, './assets/react.development.js'), 'utf-8');

    const actual = isMinified(input);
    const expected = false;

    expect(actual).toEqual(expected);
  });

  it('minified: react.production.min.js', () => {
    // https://unpkg.com/react@17.0.2/umd/react.production.min.js
    const input = fs.readFileSync(path.join(__dirname, './assets/react.production.min.js'), 'utf-8');

    const actual = isMinified(input);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('MINIFIED_SOURCE_CODE_LIST_IN_README', () => {
    const input = MINIFIED_SOURCE_CODE_LIST_IN_README;
    const actual = Object.keys(input).every((key) => isMinified(input[key]));
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('minified: short', () => {
    const input = MINIFIED_SOURCE_CODE_LIST[0];
    const actual = isMinified(input);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('minified: long', () => {
    const input = MINIFIED_SOURCE_CODE_LIST[1];
    const actual = isMinified(input);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('minified: with comments', () => {
    const input = MINIFIED_SOURCE_CODE_LIST[2];
    const actual = isMinified(input);
    const expected = true;

    expect(actual).toEqual(expected);
  });

  it('minified: with comments and long code', () => {
    const input = MINIFIED_SOURCE_CODE_LIST[3];
    const actual = isMinified(input);
    const expected = true;

    expect(actual).toEqual(expected);
  });
});
