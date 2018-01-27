# codeSchoolMongo
Code School Mongo Assignments

A couple of notes on mongo:

db.monsters.aggregate( [{"$group": {"_id": "$name", "total": {"$sum": 1}}}])

when fields begin with a "$", they are operators that perform a task
"$group" ---> telling it to group

when values begin with a "$", they represent field paths that point to the value of the specified field
"$name" ---> the _id is filled with the name values

db.monsters.aggregate( [{"$group": {"_id": "$type", "total": {"$sum": 1}, "averageAttack": {"$avg": "$stats.attack"}}}])
gets total of each type and the average attack of each type
