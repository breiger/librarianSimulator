//All the people in the prototype!

//First, the prototype Object method

function person(name, description, location){
    
    this.name = name;
    this.description = description;
    this.location = location;
    this.visible = false;
    this.canTrade = false;
    this.contains = new Array(); 
    //Thinking there might be a library object that builds lists of possible commands dynamically based on this action array. 
    this.action = null; //what is the persons current action?
	this.toWhom = null; //what is the object of that action?
	this.actions = new Array();
    this.actions.push("talk");
    this.actions.push("trade");
    this.currentDialogue = null; 
    
	this.update = function(){console.log(this.name + " is updating");}
	
	this.clear = function(){this.action = null; this.toWhom = null;};//Want to make sure that it is clear for every 'frame'.
    
    //Object-ception! 
    this.dialogue = function(prompt){
        this.prompt = prompt;
        this.responses = new Array();
        
        this.addResponse = function(response, dialogue){
            this.responses.push(new Array(response, dialogue));
            //This will allow the Library to tell you a prompt and any number of responses that lead to new dialogues.
        };
    };
    
}

//The player
var player = new person("player", "It's you, I think.", atrium);
player.name = "player";
player.visible = true;
player.canTrade = true;
//my vision is that update on every visible object will be called 
//every time the library processes input. 
player.update = function(inputLength){
 
	if(player.action == "look"){
		return look(inputLength); 
	}
	else if(player.action == "help"){
		return help(inputLength); 
	}
	else if(player.action == "walk"){
		return walk(inputLength); 
	}
    else if(player.action == "talk"){
        return startTalking(inputLength);
    }
	else if(player.action == "inv"){
		return inventory()
	}
	else{
		return "you want to " + player.action;
	}
}
//atrium.contains.push(player); //Might change this later. 
//gameWorld.push(player); //Might change this later. 

//Mary
var mary = new person("Mary the Barista", "Mary tells me that one day she will have a coffee shop of her own, but she's been here about ten years. You know the definition of insanity right, doing the same thing over and over and expecting different results? They put a picture of Mary next to that definition.", coffeeBar); 
mary.visible = true;
mary.canTrade = true; 
mary.location = coffeeBar;

mary.greeting = new mary.dialogue("You look like a coffee drinker.");
mary.greeting.addResponse("Yes. Yes I am", mary.sellCoffee = new mary.dialogue("It's two dollars a cup."));
mary.greeting.addResponse("No. No I am not.", mary.beCrazy = new mary.dialogue("I see. I'll be keeping my eye on you."));
mary.currentDialogue = mary.greeting; 

mary.sellCoffee.addResponse("I only have a twenty.", mary.chagrin = new mary.dialogue("Sigh.")); 

mary.update = function(){
	if (mary.currentDialogue == mary.chagrin){
		mary.contains.splice(mary.contains.indexOf(coffee), 1);
		if(player.contains.includes(coffee) == false){
			player.contains.push(coffee); 
			statusMessage += "You got some coffee!";
		}
	}
}

coffeeBar.contains.push(mary);
gameWorld.push(mary);