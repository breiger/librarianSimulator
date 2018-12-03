# librarianSimulator
This is a text-based game written in Javascript. It is still a work in progress. 

11/28 added support for a player inventory. 

11/30 made lots of changes. Now every object in the game world array gets an update call. This means that certain actions can happen based on object specific triggers. For example, mary gives the player a cup of coffee if you reach the right dialogue. I also created a dynamically updated list of possible actions. Now the objects that are 'visible' to the player will control what actions are possible. I also added what is becomming a bloated and ugly area of the screen for status updates and inventory. I'm now thinking that I may need to implement a menu system. Sigh. This all started because I wanted to alert the player when Mary gives her a cup of coffee. Another problem for another day.   

TODO: Create arrays of synonmyms for each of the major actions. Loop search will then search each array and then return the major action. Example walk = ["walk", ["go", "travel", "run", etc...]]; 

