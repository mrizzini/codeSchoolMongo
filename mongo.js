// Create a function that accepts the 4 attributes plus a 5th variable called db. 
// This variable would reference the mongodb like in the shell. 
// Write the javascript code that would insert the four attributes into the “monster” collection as a new document.
// Write the code that would then console.log all the documents inside the collection.
// Write the command that will find your monster based on a name
// Write the command that will find a monster based on one of the attacks it has (if possible use a command that will return more than one monster with the same attack type)
// Write the command that will find a monster based on their defense stat.


use myGame // shell command to create a database called myGame

 db.monsters.insert( //shell command to insert a new monster into the monster collection, this creates the collection if first time using it
{
    name: "Frankenstein",
    health: 8,
    lastFought: new Date(2018, 0, 12),
    attacks: ["punch", "scream", "re-animate"],
    stats: {
        attack: 8.5,
        defense: 6.5
    }
 }
)

db.monsters.insert( //shell command to insert monster
 {
     name: "Nosferatu",
     health: 7.5,
     lastFought: new Date(2017, 9, 31),
     attacks: ["bite", "hypnosis", "re-animate"],
     stats: {
        attack: 8.0,
        defense: 9.0
    }
 }
 )


function monsterCollection (name, health, lastFought, attacks, stats, db) {
    db.monsters.insert({
            "name": name, 
            "heath": health, 
            "last fought": lastFought, 
            "attacks": attacks, 
            "stats": {"attack": stats.attack, "defense": stats.defense}
        }
        );
            
    console.log(db.monsters.find());
    db.monsters.find({"name": name});
    db.monsters.find({"attacks": attacks});
    db.monsters.find({"stats.defense": stats.defense});
}

// i wasn't sure if the assignment needs to accept the parameters in the function or if we are supposed to use our own input 
// so here is the other way

function monsterCollection (name, health, lastFought, attacks, stats, db) {
    db.monsters.insert({ // inserts a new monster
            "name": "Creature from the Black Lagoon", 
            "heath": 6.5, 
            "last fought": new Date (1954, 2, 16), 
            "attacks": ["scare", "swim", "eat"], 
            "stats": {"attack": 4.0, "defense": 5.5}
        }
        );
            
    console.log(db.monsters.find()); // returns all monsters
    db.monsters.find({"name": "Frankenstein"}); //returns any monster named Frankenstein
    db.monsters.find({"attacks": "re-animate"}); // returns any monster with an attack of re-animate
    db.monsters.find({"stats.defense": 9.0}); // returns any monster with a defense of 9.0, within the stats object
}

// starting level 3 assignment

var mongo = function(db) {

// Write the command that will find all monsters with an attack lower than 10
db.monsters.find({"stats.attack": {"$lt": 10}})

// Write the command that will find all monsters with a level above 5 but below 15 inclusive
db.monsters.find({"level": {"$gt": 5, "$lt": 15}})

// Write the command to find monsters that do not have the “bite” attack.
db.monsters.find({"attacks": { "$ne": "bite" }})

// Write the command to find monsters with levels less than 6 but only return the name, level and health attributes
db.monsters.find({"level": {"$lt": 6}}, {"name": true, "level": true, "health": true, "_id": false})

// Write the command to find all monsters who attack is between 10 and 20 but do not include the monsters health or style
db.monsters.find({"stats.attack": {"$gt": 10, "$lt": 20}}, {"health": false, "style": false})

// Write the command to find out how many monsters are in the collection.
db.monsters.find().count()

// Write the command to sort the collection by the monsters level with the highest level at the top and the lowest at the bottom
db.monsters.find().sort({"level": -1})

};

// starting level 5 assignment, form questions

db.monsters.aggregate([{"$group": {"_id": "$type"}}])

db.monsters.aggregate( [{"$group": {"_id": "$type", "total": {"$sum": 1}, "averageAttack": {"$avg": "$stats.attack"}}}])