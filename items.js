//All of the items in the game. 

function item(name, description){
	this.name = name;
	this.description = description; 
	this.location = null;
	this.contains = new Array();
	this.actions = new Array();
	this.actions.push("take");
	this.actions.push("give");
	this.visible = false;
	this.locked = true;
    
    this.update = function(){console.log(this.name + " is updating");}
}

var officeDoor = new item ("Door to the Office", "It says manager. You are intimidated by the ornate woodwork of the door. I assume. Most people are.");
officeDoor.visible = true;
officeDoor.actions = ["knock"];
gameWorld.push(officeDoor);
office.contains.push(officeDoor);

var twenty = new item("a twenty", "Your money, a crisp new twenty."); 
twenty.visible = true;
twenty.locked = false;
gameWorld.push(twenty);
player.contains.push(twenty); 

var coffee = new item("some coffee", "What a smell! Intoxicating!"); 
coffee.visible = true;
coffee.locked = false;
gameWorld.push(coffee);
mary.contains.push(coffee); 

