//Library.js
//This you can call this the main loop or the game engine. 

//It needs an actions list. This might be dynamically updated based on what is visible.
//Now I need to decide if I want to make this an object...
var actions = new Array();

//All of the game objects.
var gameWorld = [];

var EXPLORING = 0;
var TALKING = 1;
var gameMode = EXPLORING; 

//Returned when the library is 'confused'
var confusedResponses = ["My budget speech recognition software says, what?", "Due to budget cuts, I don't understand your high-fallutin' natural language.", "This is the the computer equivalent of smiling and nodding. But if I had eyes, you would see they are filled with the the panic of not understanding.", "My software = cheap = I don't know from no whatever you just said.", "Garbage in. Garbage out. I'm confused, but please don't pout.", "Does not compute.", "CTRL-ALT-What did you say?"]

//The main game function. Simply searches through every word of the input
//Then it sets the player intention variables for further processing. 
function process_input(input){
    buildActions();
	lowerInput = input.toLowerCase(); //lower case is easier to process!
	splitInput = lowerInput.split(" "); //And if we make it an array, we can loop!
    
    //Eventually might make more use of these game modes. For now, need to 
    //know when we are in a dialogue. 
    if (gameMode == TALKING){
        return talk(splitInput); 
    }
    
	//If one of the words is in the actions dialogue.
	action = loopSearch("action", splitInput, actions);
	
	//If another of the words mataches a name of a game object.
	toWhom = loopSearch("name", splitInput, gameWorld);
	
	//Change the player's intended action and who or what she wants to do that too. 
	if(action != null){
		player.action = action;
		if(toWhom != null){
			player.toWhom = toWhom;
		}
		return update(splitInput.length); //need the length of the input to know whether or not to get confused. 
	}
				
	//Else say "you wish you could + input" or return one of the confusedResponses at random.
	else{
		return getConfused();
	}
}

//most of the game logic.
function update(inputLength){
	return player.update(inputLength);
}

function look(inputLength){
	//Checks if the player intends to look at something specific. If so, returns the description of that object. 
	//Else, it will return the description of the current location. 
	//It will also add a string that details if there are any visible objects within the location/object of intention. 
	var outputMessage = "";
	if(player.toWhom != null){
		if(player.toWhom.contains.length > 0){
			//Will add the name of any person or item within the location. 
			outputMessage = "<br><br>You can also see: "
			for(var i = 0; i<player.toWhom.contains.length; i++){
				outputMessage += "<br>" + player.toWhom.contains[i].name; 
			}
		}
		return player.toWhom.description + outputMessage; 
	}
	else if(inputLength < 2){
		//The player just put look. 
		if(player.location.contains.length > 0){
			outputMessage = "<br><br>You can also see: "
			for(var i = 0; i < player.location.contains.length; i++){
				outputMessage += "<br>" + player.location.contains[i].name; 
			}
		}
		return player.location.description + outputMessage; 
	}
	else{
		return getConfused();
	}
}

function walk(inputLength){
	if(player.toWhom != null && player.toWhom.currentDialogue == null ){ //if we are actually trying to walk to a location
		//and not a person or something. 
		player.location = player.toWhom;
		return look();
	}
	else if(inputLength < 2){
		return "Where do you want to go? Say walk and your destination.";
	}
	else{
		return getConfused();
	}
}

function startTalking(inputLength){ //Simplifying the code a bit. This starts a dialogue, switching into TALKING mode.  
    if(player.toWhom != null){//If we actually want to talk to someone.
        if(player.location != player.toWhom.location){//Must be in the same location to engage in dialogue. 
            return "They can't hear you. Try walking a over there. Say walk [location]"; 
        }
        if(player.toWhom.currentDialogue == null){//If we aren't trying to talk to a wall or something
            return "You can't talk to that"; 
        }
        gameMode = TALKING; //Swith to talking mode. 
        return buildDialogue(); 
    }
    else if(inputLength < 2){
        return "Who do you want to talk to? Say 'talk [person]'";
    }
    else{
        return getConfused(); 
    }
    
    
}

function talk(input){ //and this continues a dialogue;
	//Processes all input in talking mode.
	for (var i=0; i<player.toWhom.currentDialogue.responses.length; i++){ //for every available response
		console.log("We are on responses:" + i);
		for(var j=0; j<input.length; j++){ //for every member of the input
			if(input[j] == i.toString()){ //if the input is a number that matches one of the responses
				player.toWhom.currentDialogue = player.toWhom.currentDialogue.responses[i][1]; //set the current dialogue of the person we are talking to to match the linked object in the list of available responses
				return buildDialogue();
			}
		}
	}
	//If we can't find a dialogue
	return "Please enter a number. Budget cuts, you know.<br>" + buildDialogue();    
}

function buildDialogue(){
	//Make the output screen for all dialogue interactions. 
	var outMessage = "<br><hr>Available responses. Just enter the number.<br>";//Build the output.
        for (var i = 0; i < player.toWhom.currentDialogue.responses.length; i++){
            outMessage += "<br> " + i + ") " + player.toWhom.currentDialogue.responses[i][0];
        }
        if(player.toWhom.currentDialogue.responses.length == 0){
			gameMode = EXPLORING;
		}
        return "<p id='dialogue'>" + player.toWhom.name + ": " + player.toWhom.currentDialogue.prompt + "</p>" + outMessage;
}

function inventory(){
	//Displays the player's current inventory. 
	var outMessage = "You are carrying:<br>";
	for (var i = 0; i < player.contains.length; i++){
		outMessage += "<br>" + player.contains[i].name; 
	}
	return outMessage; 
}

function help(){ //Make a help screen with available commands. 
	var helpMessage = "Imagine that you have stepped into a library. The air is full of dust that filters and reflects the light, making the air seem to glimmer. But it also makes you cough. This is where you work now. So get to it. Type commands to interact with the library. Two or three word commands work best. Try typing 'look'. <br><br>";
	var helpTable = "<table style='width:100%'><tr><th>Available Verbs</th><th>Available Nouns</th></tr><tr><td>";
	for(var i = 0; i < actions.length; i++){
		helpTable += "<br>" + actions[i];
	}
	helpTable += "</td><td>";
	for(var i = 0; i < gameWorld.length; i++){
		helpTable += "<br>" + gameWorld[i].name;
	}
	helpTable += "</td></tr></table>";
	return helpMessage + helpTable;
}

function buildActions(){//build the actions array dynamically for every call to process input. 
    actions = ["help", "inv"]; //Clear the old actions array.
    for(var i = 0; i < gameWorld.length; i++){ //For every visible object in the game world.
        if (gameWorld[i].visible == true){
            for(var j = 0; j < gameWorld[i].actions.length; j++){//add its actions to the global actions array. 
                if(actions.includes(gameWorld[i].actions[j]) == false){//make sure there are no duplicates. 
					actions.push(gameWorld[i].actions[j]);	
				}
            }
        }
    }
}

function loopSearch(type, array1, array2){
	//Loop searching is something we will do over and over in this game. 
	//This will loop search for names or actions. 
	for(var i=0; i<array1.length; i++){
		for(var j = 0; j < array2.length; j++){
			if(type == "name"){//we want to see if the input is in our 'dictionary' of names/nouns.
				var lowerName = array2[j].name.toLowerCase();; //want to search on any word in the name
				var splitName = lowerName.split(" ");//so we make it an array
				for(var k = 0; k < splitName.length; k++){//and then do another loop search
					if(array1[i] == splitName[k]){
						return array2[j];
					}	
				}
			}
			else if(type == "action"){ //we want to see if the input is in our 'dictionary' of actions/verbs. 
				if(array1[i] == array2[j]){
						return array2[j];
				}	
			}
			else{return null}
		}
	}
}

function getConfused(){
	var randomResponse = Math.floor(Math.random() * 100);
		if(randomResponse > 50){
			return "You wish you could " + lowerInput;
		}
		else{
			randomResponse = Math.floor(Math.random() * confusedResponses.length);
			return confusedResponses[randomResponse];
		}
}

