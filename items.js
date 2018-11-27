//All of the items in the game. 

function item(name, description){
	this.name = name;
	this.description = description; 
	this.location = null;
	this.contains = new array();
	this.actions = new array();
	this.actions.push("take");
	this.actions.push("give");
	this.visible = false;
	this.locked = true;
}