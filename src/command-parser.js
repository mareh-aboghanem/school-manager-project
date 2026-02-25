export function parseCommand(userInput) {
  const [command, subcommand, ...args] = userInput.split(' ');
  return { command, subcommand, args };
}
