'use strict';

const readline = require('readline');

const textUtil = require('./util/textUtil');

const Location = require('./model/location');
const Hero = require('./model/hero');
const Item = require('./model/item');

const DIRECTIONS = [ 'north', 'south', 'east', 'west'];

const VERBMAPPING = {
  q   : 'quit',
  g   : 'go',
  bye : 'quit',
  n   : 'north',
  s   : 'south',
  e   : 'east',
  w   : 'west',
  l   : 'look',
  inv : 'inventory',
  i   : 'inventory'
};

main();

// ===============================
function main() {
  let heroName = process.argv[2] || 'adventurer';

  let initialLocation = initialiseMap();

  let hero = new Hero(heroName, initialLocation);
  
  runGame(hero);
}

// ===============================
function initialiseMap() {
  let clearing = new Location('clearing', 'A clearing in a wood.');
  let garden = new Location('garden', 'A pretty garden. Birds are singing.');
  let hut = new Location('dark hut', 'It smells musty in here.');

  let sword = new Item('sword', 'A sharp, shining sword.');
  let candle = new Item('candle', 'An old wax candle.');
  let eagle = new Item('eagle', 'A proud eagle. It shuffles warily on its perch.');

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
  describeLocation(hero.getLocation());

  inputReader.question('What now? ', resp => {
    processResponse(hero, resp);
    commandLoop(hero, inputReader);
  });
}

// ===============================
function processResponse(hero, response) {
  let [verb, object] = response.split(/ +/);

  if (!verb) {
    console.log('I beg your pardon?');
    return;
  }

  if (verb === 'go') {
    verb = object;
    object = null;
  }

  let translatedVerb = VERBMAPPING[verb];

  if (translatedVerb) {
    verb = translatedVerb;
  }

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
  let location = hero.getLocation();

  if (verb === 'take') {
    let item = location.itemNamed(object);
    if (item) {
      hero.take(item);
      console.log('You picked up ' + textUtil.withArticle(object) + '.');
    } else {
      console.log('You can\'t see ' + textUtil.withArticle(object) + '!');
    }
    return;
  }

  if (verb === 'drop') {
    let item = hero.itemNamed(object);
    if (item) {
      hero.drop(item);
      console.log('You no longer have ' + textUtil.withArticle(object) + '.');
    } else {
      console.log('You don\'t have ' + textUtil.withArticle(object) + '!');
    }
    return;
  }

  console.log('I don\'t know how to ' + verb + ' the ' + object + '!');
}

// ===============================
function processDirectionCommand(hero, direction) {
    let moved =  hero.go(direction);
    if (!moved) {
      console.log('You can\'t go that way!');
    }
}

// ===============================
function processVerbCommand(hero, verb) {
  if (verb === 'quit') {
    console.log('Farewell, ' + hero.getName() + '!\n\n');
    process.exit(0);
  }

  if (verb === 'look') {
    let locationName = textUtil.capitalise(hero.getLocation().getName());
    console.log(locationName + ': ' + hero.getLocation().getDescription());
    return;
  }

  if (verb === 'inventory') {
    if (hero.numberOfItemsCarried() === 0 ) {
      console.log('You aren\'t carrying anything!');
      return;
    }

    console.log('You are carrying: ');
    hero.withInventory(itemName => {
      console.log('  - ' + textUtil.withArticle(itemName));
    });

    return;
  }

  console.log('I\'m afraid I don\'t understand how to ' + verb + '!');
}

// ===============================
function describeLocation(location) {
  console.log('You are in a ' + location.getName() + '.');
  
  location.withItems(name => {
    console.log('There is ' + textUtil.withArticle(name) + ' here.');
  });
  
  location.withExits((direction, exit) => {
    console.log('You see a ' + exit.kind + ' to the ' + direction + '.');
  });
}

// ===============================
function isDirection(verb) {
  return DIRECTIONS.includes(verb);
}
