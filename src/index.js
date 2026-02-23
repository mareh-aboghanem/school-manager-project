import { parseCommand } from "./command-parser.js";
import promptSync from 'prompt-sync';
import { handleTraineeCommand } from "./traineeCommands.js";
import { handleCourseCommand } from "./courseCommands.js";
const prompt = promptSync();

// This is the entry point of your application. 
// Ask user for input, parse the command, and call the appropriate function from courseCommands.js or traineeCommands.js based on the command.
while(true) {
console.log(">");
const userInput = prompt();
if (userInput=="QUIT"||userInput=="q"){
    break;
}
const command = parseCommand(userInput);
if(command.command === "TRAINEE"){
    handleTraineeCommand(command.subcommand, command.args);
} else if(command.command === "COURSE"){
    handleCourseCommand(command.subcommand, command.args);
}
// *for later i need to delete the console line 
console.log(command);
//console.log('Hello world');
}
