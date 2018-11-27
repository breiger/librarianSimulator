//locations. All the places in the game

function place(name, description){
	this.name = name; 
	this.description = description;
	this.visible = false;
	this.locked = true; 
	this.contains = new Array();
	this.actions = new Array();
	this.actions[0] = "look";
	this.update; //Future function. I think. Not sure how it will all work yet. 
}

//The atrium or entrance to the game. 
var atrium = new place("Atrium", "This is my entrance. Impressive isn’t it? Feels like you are standing in an old cathedral. Shhhh. I know you’re impressed. That rotunda is rose stained glass. I said ROSE! My atrium is fancy.");
atrium.visible = true;
atrium.locked = false;

//add the atrium to the game world
gameWorld.push(atrium);

//The coffee bar. Buy coffee. Get to know Mary.
var coffeeBar = new place("Coffee Bar", "I’m told that the coffee smell is intoxicating. I’m also told that intoxication is a good thing. Maybe you should get intoxicated off of some coffee smell.");  
coffeeBar.visible = true;
coffeeBar.locked = false;

//Add the coffee bar to the atrium. 
atrium.contains.push(coffeeBar);

//Add the coffee bar to the gameWorld
gameWorld.push(coffeeBar);

//The office or final level of the demo!
var office = new place("office", "Ah, the location of my mainframe. It’s like my brain, or my heart, but NOT my soul. I've been told that I do not have a soul. I’m also told this is a good thing because I don’t have to be weighed down by guilt or moral culpability.");
office.visible = true;

//Add the office to the atrium 
atrium.contains.push(office);

//Add the office to the gameWorld;
gameWorld.push(office);