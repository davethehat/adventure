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
    let location = new Location('test','a test location');
    let hero = new Hero('adventurer', location);

    let item1 = new Item('test1', 'a test item');
    let item2 = new Item('test2', 'another test item');

    location.place(item1);
    location.place(item2);


    // === TASK 3 ===
    // You will need to write this method in hero.js
    hero.takeAll();

    assert.equal(hero.numberOfItemsCarried(), 2, 'hero has taken two items');
    assert(hero.holds(item1), 'hero has first item');
    assert(hero.holds(item2), 'hero has second item');
    assert(!location.contains(item1), 'first item is missing from the location');
    assert(!location.contains(item2), 'second item is missing from the location');

}

function shouldDropAllAtALocation() {
  // === TASK 4 ===
  // your code here
}



function main() {
  shouldHaveNoInventoryWhenCreated();
  shouldCarryAnItemWhenPickedUp();
  shouldLoseAnItemWhenDropped();

  // === TASK 3 ===
  // uncomment this test, and make the tests pass
  shouldTakeAllAtALocation();

  // === TASK 4 ===
  // uncomment this test
  // shouldDropAllAtALocation();

  console.log(__filename, 'all OK');
}

main();
