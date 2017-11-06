'use strict';


const VOWELS = 'aeiou';

module.exports = {
  withArticle(s) {
    const article = VOWELS.includes(s[0].toLowerCase())
      ? 'an'
      : 'a';
    return `${article} ${s}`;
  },

  capitalise(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
};