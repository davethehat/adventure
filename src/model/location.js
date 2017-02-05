'use strict';

const textUtil = require('../util/textUtil')

class Location {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.exits = {};
    this.items = {};
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  withItems(fn) {
    Object.entries(this.items).forEach(([name, item]) => fn(name, item));
  }
  
  withExits(fn) {
    Object.entries(this.exits).forEach(([direction, exit]) => fn(direction, exit))
  }

  addExit(direction, kind, location) {
    this.exits[direction] = {
      location: location,
      kind: kind
    };
  }

  place(item) {
    this.items[item.getName()] = item;
  }

  remove(item) {
    delete this.items[item.getName()];
  }

  contains(item) {
    return !!this.items[item.getName()];
  }
  
  itemNamed(itemName) {
    return this.items[itemName];
  }

  go(direction) {
    var exit = this.exits[direction];
    return exit ? exit.location : null;
  }
}



module.exports = Location;
