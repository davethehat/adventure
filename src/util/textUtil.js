'use strict';


const VOWELS = 'aeiou';

module.exports = {
  withArticle(s) {
    if (VOWELS.includes(s[0].toLowerCase())) {
      return 'an ' + s;
    }
    return 'a ' + s;
  },

  capitalise(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
};