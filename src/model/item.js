'use strict'


class Item {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  toString() {
    return 'A ' + this.name;
  }
  
  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }
}

module.exports = Item;
