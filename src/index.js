import { parseCommand } from './command-parser.js';
import promptSync from 'prompt-sync';
import { handleTraineeCommand } from './traineeCommands.js';
import { handleCourseCommand } from './courseCommands.js';
const prompt = promptSync();

while (true) {
  console.log('>');
  const userInput = prompt();
  if (userInput == 'QUIT' || userInput == 'q') {
    break;
  }
  const command = parseCommand(userInput);
  if (command.command === 'TRAINEE') {
    handleTraineeCommand(command.subcommand, command.args);
  } else if (command.command === 'COURSE') {
    handleCourseCommand(command.subcommand, command.args);
  }
}
