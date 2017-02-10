'use strict';


const assert = require('assert');

const Location = require('../src/model/location.js');
const Item = require('../src/model/item.js');

function shouldHaveNoItemsWhenCreated() {
  let location = new Location('test', 'a test location');
  let itemCount = 0;
  location.withItems( () => itemCount++);
  assert.equal(itemCount, 0);
}


function shouldPlaceAnItem() {
  let location = new Location('test', 'a test location');
  let item = new Item('widget', 'an item for a test');
  let itemCount = 0;

  location.place(item);
  location.withItems( (name, itemInLocation) => {
    itemCount++;
    assert.equal(name, 'widget');
    assert.equal(itemInLocation, item);
  });
  assert.equal(itemCount, 1);
}

function shouldHaveNoExitsWhenCreated() {
  let location = new Location('test', 'a test location');
  let exitCount = 0;
  location.withExits( () => exitCount++);
  assert.equal(exitCount, 0);
}

function shouldAddAnExit() {
  let location = new Location('test', 'a test location');
  let destination = new Location('a destination');

  let exitCount = 0;

  location.addExit('north', 'path', destination);
  location.withExits( (direction, exit) => {
    exitCount++;
    assert.equal(direction, 'north');
    assert.equal(exit.kind, 'path');
    assert.equal(exit.location, destination);
  });
  assert.equal(exitCount, 1);
}


function main() {
  shouldHaveNoItemsWhenCreated();
  shouldPlaceAnItem();
  shouldHaveNoExitsWhenCreated();
  shouldAddAnExit();
  console.log(__filename, 'all OK');
}

main();
