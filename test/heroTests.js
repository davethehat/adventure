'use strict';

const assert = require('assert');

const Hero = require('../src/model/hero.js');
const Location = require('../src/model/location.js');
const Item = require('../src/model/item.js');

function shouldHaveNoInventoryWhenCreated() {
  let hero = new Hero('adventurer', null);
  assert.equal(hero.numberOfItemsCarried(), 0);
}

function shouldCarryAnItemWhenPickedUp() {
  let location = new Location('test','a test location');
  let item = new Item('test', 'a test item');
  let hero = new Hero('adventurer', location);

  location.place(item);
  assert(location.contains(item));

  hero.take(item);

  assert.equal(hero.numberOfItemsCarried(), 1);
  assert.ok(hero.holds(item));
  assert(!location.contains(item));
}

function shouldLoseAnItemWhenDropped() {
  let location = new Location('test','a test location');
  let item = new Item('test', 'a test item');
  let hero = new Hero('adventurer', location);

  location.place(item);
  hero.take(item);

  assert.equal(hero.numberOfItemsCarried(), 1);
  assert(hero.holds(item));
  assert(!location.contains(item));

  hero.drop(item);

  assert.equal(hero.numberOfItemsCarried(), 0);
  assert(!hero.holds(item));
  assert(location.contains(item));

}


function shouldTakeAllAtALocation() {
  // your code here...  
}


function main() {
  shouldHaveNoInventoryWhenCreated();
  shouldCarryAnItemWhenPickedUp();
  shouldLoseAnItemWhenDropped();
  shouldTakeAllAtALocation();
  console.log(__filename, 'all OK');
}

main();
