'use strict';


const readline = require('readline');

const textUtil = require('./util/textUtil');

const Location = require('./model/location');
const Hero = require('./model/hero');
const Item = require('./model/item');

const DIRECTIONS = [ 'north', 'south', 'east', 'west'];

const VERBMAPPING = {
  g    : 'go',
  q    : 'quit',
  bye  : 'quit',
  exit : 'quit',
  n    : 'north',
  s    : 'south',
  e    : 'east',
  w    : 'west',
  l    : 'look',
  inv  : 'inventory',
  i    : 'inventory'
};

let verbose = false;

main();

// ===============================
function main() {
  const heroName = process.argv[2] || 'adventurer';
  const initialLocation = initialiseMap();
  const hero = new Hero(heroName, initialLocation);
  
  runGame(hero);
}

// ===============================
function initialiseMap() {
  const clearing = new Location('clearing', 'A clearing in a wood.');
  const garden = new Location('garden', 'A pretty garden. Birds are singing.');
  const hut = new Location('dark hut', 'It smells musty in here.');

  const sword = new Item('sword', 'A sharp, shining sword.');
  const candle = new Item('candle', 'An old wax candle.');
  const eagle = new Item('eagle', 'A proud eagle. It shuffles warily on its perch.');

  clearing.addExit('east', 'path', garden);

  garden.addExit('west', 'path', clearing);
  garden.addExit('north', 'hut', hut);
  garden.place(sword);

  hut.addExit('south', 'door', garden);
  hut.place(candle);
  hut.place(eagle);

  return clearing;
}

// ===============================
function runGame(hero) {
  console.log('================================');
  console.log('Welcome, ' + hero.getName());
  console.log('================================');

  const inputReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  commandLoop(hero, inputReader);
}

// ===============================
function commandLoop(hero, inputReader) {
  console.log('...');

  let location = hero.getLocation();
  if (verbose) {
    describeLocationVerbose(location);
    verbose = false;
  } else {
    describeLocation(location);
  }

  inputReader.question('What now? ', resp => {
    processResponse(hero, resp);
    commandLoop(hero, inputReader);
  });
}

// ===============================
function processResponse(hero, response) {
  let [verb, object] = response.split(/\s+/);

  verb = VERBMAPPING[verb] || verb;

  if (verb === 'go') {
    verb = object;
    object = null;
  }

  if (verb) {
    performAction(hero, verb, object);
  } else {
    console.log('I beg your pardon?');
  }
}

// ===============================
function performAction(hero, verb, object) {
  if (object) {
    processVerbObjectCommand(hero, verb, object);
  } else if (isDirection(verb)) {
    processDirectionCommand(hero, verb);
  } else {
    processVerbCommand(hero, verb);
  }
}

// ===============================
function processVerbObjectCommand(hero, verb, object) {
  if (verb === 'take') {
    doTake(hero, object);
  } else if (verb === 'drop') {
    doDrop(hero, object);
  } else {
    console.log('I don\'t know how to ' + verb + ' the ' + object + '!');
  }
}

// ===============================
function processDirectionCommand(hero, direction) {
  let moved = hero.go(direction);
  if (!moved) {
    console.log('You can\'t go that way!');
  }
}

// ===============================
function processVerbCommand(hero, verb) {
  if (verb === 'quit') {
    console.log('Farewell, ' + hero.getName() + '!\n\n');
    process.exit(0);
  } else  if (verb === 'look') {
    verbose = true;
  } else  if (verb === 'inventory') {
    doInventory(hero);
  } else {
    console.log('I\'m afraid I don\'t understand how to ' + verb + '!');
  }
}

// ===============================
function doTake(hero, itemName) {
  const location = hero.getLocation();
  const item = location.itemNamed(itemName);

  if (itemName === 'eagle') {
    console.log('The eagle screeches and pecks angrily at your fingers. The\n' +
                'magnificent bird is not impressed by your overtures.');
  } else if (item) {
    hero.take(item);
    console.log('You picked up ' + textUtil.withArticle(itemName) + '.');
  } else {
    console.log('You can\'t see ' + textUtil.withArticle(itemName) + '!');
  }
}

// ===============================
function doDrop(hero, itemName) {
  const item = hero.itemNamed(itemName);
  if (item) {
    hero.drop(item);
    console.log('You no longer have ' + textUtil.withArticle(itemName) + '.');
  } else {
    console.log('You don\'t have ' + textUtil.withArticle(itemName) + '!');
  }
}

// ===============================
function doInventory(hero) {
  if (hero.numberOfItemsCarried() === 0 ) {
    console.log('You aren\'t carrying anything!');
  } else {
    console.log('You are carrying: ');
    hero.withInventory(itemName => {
      console.log('  - ' + textUtil.withArticle(itemName));
    });
  }
}

// ===============================
function describeLocation(location) {
  console.log('You are in a ' + location.getName() + '.');
  
  location.withItems(name => {
    console.log('There is ' + textUtil.withArticle(name) + ' here.');
  });
  
  location.withExits((direction, exit) => {
    console.log('You see ' + textUtil.withArticle(exit.kind) + ' to the ' + direction + '.');
  });
}


// ===============================
function describeLocationVerbose(location) {
  console.log('You are in a ' + location.getName() + '.');
  console.log(location.getDescription());

  location.withItems((name, item) => {
    console.log('There is ' + textUtil.withArticle(name) + ' here.');
    console.log(item.getDescription());
  });

  location.withExits((direction, exit) => {
    console.log('You see ' + textUtil.withArticle(exit.kind) + ' to the ' + direction + '.');
  });
}

// ===============================
function isDirection(verb) {
  return DIRECTIONS.includes(verb);
}
