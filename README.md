# librarianSimulator
This is a text-based game written in Javascript. It is still a work in progress. 

11/28 added support for a player inventory. 
 
TODO: Create arrays of synonmyms for each of the major actions. Loop search will then search each array and then return the major action. Example walk = ["walk", ["go", "travel", "run", etc...]]; 

Biggest design issue: So I was happily coding along, getting the dialogue system to work, when all of a sudden I wanted the dialogue with marry to possibly end in her giving the player a cup of coffee. Then I was like, how do I get Mary to give the player a cup of coffee? 

What I don't want to do is have to write a bunch of if statements: If the player chooses this dialogue branch, then get the coffee from Mary and give it to the player. 

I would like the player's input to trigger a "frame" in which every object in the game gets updated.

So Mary's update function would have one if statement that said if her current_dialogue is sigh, then she gives a coffee. 
