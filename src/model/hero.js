'use strict';

class Hero {
  constructor(name, initialLocation) {
    this.name = name;
    this.location = initialLocation;
    this.inventory = {};
  }

  getName() {
    return this.name;
  }
  
  getLocation() {
    return this.location;
  }
  
  withInventory(fn) {
    Object.entries(this.inventory).forEach(([name, item]) => fn(name, item));
  }
  
  go(direction) {
    let newLocation = this.location.go(direction);
    if (newLocation) {
      this.location = newLocation;
    }
    
    return newLocation;
  }

  drop(item) {
    if (this.holds(item)) {
      delete this.inventory[item.getName()];
      this.location.place(item);      
    }
  }
  
  take(item) {
    if (this.location.contains(item)) {
      this.location.remove(item);
      this.inventory[item.getName()] = item;
    }
  }
  
  holds(item) {
    return !!this.inventory[item.getName()];
  }

  itemNamed(itemName) {
    return this.inventory[itemName];
  }

  numberOfItemsCarried() {
    return Object.getOwnPropertyNames(this.inventory).length;
  }
}

module.exports = Hero;
