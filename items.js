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
}

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

