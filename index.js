/**
 * Use "Duck Typing" to detect whether source code is minified.
 * > Duck typing in computer programming is an application of the duck test—"If it walks like a duck and it quacks like a duck, then it must be a duck"—to determine whether an object can be used for a particular purpose. With normal typing, suitability is determined by an object's type. In duck typing, an object's suitability is determined by the presence of certain methods and properties, rather than the type of the object itself.[1][2]
 * > From https://en.wikipedia.org/wiki/Duck_typing
 *
 * - no space before `return`
 * - no space before and after `if` or `else`
 * - no space before and after `=`
 * - no space before `var`
 *
 * @param {string} sourceCode
 * @returns {boolean}
 */
exports.isMinified = function isMinified(sourceCode) {
  return ['return', 'if', 'else', '=', 'var'].some((keyword) => {
    const index = sourceCode.indexOf(keyword);

    if (index !== -1 && index !== 0) {
      const charBefore = sourceCode[index - 1];

      return !isSpace(charBefore);
    }
  })
}

/**
 * @param {string} char
 * @returns {boolean}
 */
function isSpace(char) {
  return /\s/.test(char);
}
