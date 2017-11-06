'use strict';


const Location = require('./model/location');
const Hero = require('./model/hero');
const Item = require('./model/item');

const { runGame } = require('./engine');

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

