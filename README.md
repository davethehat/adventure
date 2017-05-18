# adventure
Adventure game skeleton for LCCM open day workshop

*NB* to run this exercise you will need Node.js (use the latest version, currently 7.5.0) installed on your computer. Download this from https://nodejs.org/en/

At the open day workshop we'll be running this in a cloud-based development environment called Cloud9. 

When working with software, more often than not we don't start from scratch. We work with code that already exists — either code someone else has written, or code we wrote yesterday, last week, last month. This short workshop presents a number of tasks around a simple text adventure game written in Javascript. 

Work in pairs. You will find it helpful if one of you knows at least a bit of JavaScript, but even if not, providing you have some level of programming experience you should be able to work out what's going on and complete the tasks.

We'll talk and review between the tasks, and show each other/discuss the solutions so far.

We only have 30 minutes for this open day workshop, so don't worry if you don't get to finish everything! If you want to download the code and play with it some more, it's available on GitHub at https://github.com/davethehat/adventure

The game source is in a folder `adventure`. In Cloud9 you should see a window named 'bash' in the tabs beneath the editing window, so click in the tab and type

```
$ npm start <your name here>
```
(If you're running this at home, open a terminal window, and change directory into the `adventure` directory in the directory into which you downloaded the adventre codebase.)

This will bring you to a prompt:
```
$ npm start David

> adventure@1.0.0 start /Users/david.harvey/dev/adventure
> node ./src/main.js "David"

================================
Welcome, David
================================
...
You are in a clearing.
You see a path to the east.
What now? 
```
You can type simple commands:

'north', 'south', 'east', 'west' to move
'look' for a more detailed description of where you are
'take <item>' to pick something up
'drop <item>' to drop something you're carrying
'inventory' to see what you're carrying
'quit' to leave the adventure

Spend a couple of minutes exploring the tiny world.

Now look at the source code. This will be open in an IDE on your desktop.

Firstly take a look at src/main.js, which holds the game's main logic. Don't worry too much about most of what's going on here: look at main() and initialiseMap(). 

##TASK 1
Using the existing code as an example:

1. Add a location to the game.
2. Add an item to the game.

Now we're going to dive a bit deeper into the code. Take a look at the function in main.js called processVerbObjectCommand. As the name suggests, this is the code that's run when our little game engine deals with a command like take sword. You'll see these call methods on our hero, so take a look at hero.js. If you've worked with languages that let you create classes and objects this should be quite familiar: we'll have a 2-minute overview in the group to clarify/explain. 

We're going to expand the repertoire of actions with the ability to take all and drop all. We're going to do this by writing some tests first, that execute these actions against the code that represents our hero.

The tests in this project live in a folder called test. We can run these tests using the following command (from the adventure folder)

```
$ npm test
```

##TASK 2
Take a look at the test code in test/heroTests.js in the IDE. What's common in the way these tests set things up, do something and then check the results?

Break a test by changing an assertion, then run the tests again and see what happens. Undo your change so the test passes again.

##TASK 3
Uncomment the call to shouldTakeAllAtALocation and run the tests. The tests should fail spectacularly.

* add a method takeAll to the Hero class, but leave it empty for now, and run the tests again. What happens?
* make the tests pass by writing the code for takeAll in the Hero class. (Hint — look for some existing code that does something with all the items in a location. Can you use the same pattern?)
* update the code in main.js processVerbObjectCommand to recognise the command "take all" and call this method on the hero.

##TASK 4
Complete the method should DropAllAtALocation to test/heroTest.js,  implement the appropriate method on the Hero class so that the tests pass, and add it to the commands that the game understands. 

##TASK 5 (homework)
Take a look at the original Colossal Cave Adventure by Crowther and Woods (the Wikipedia page on the game has links to numerous online and downloadable versions). Can you think of how you'd add some of the features of the original adventure to our little JavaScript game? For example
* You can only open a door if you have a key
* Magic words which if used at particular places introduce items, open passages, teleport the hero
* Scoring
* Saving the game

##TASK 6 (homework — advanced)
If you are more familiar with JavaScript and coding in general: the game engine in main.js is quite obvious, but not as it stands particularly easy to extend with new commands and capabilities. How might you make it easier to add the functionality you've explored in Task 5.

