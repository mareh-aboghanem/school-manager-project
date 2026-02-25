export function parseCommand(userInput) {
  // In case there is more space in the input.
  const cleanedInput = userInput.trim().replace(/\s+/g, ' ');
  const [command, subcommand, ...args] = cleanedInput.split(' ');
  return { command, subcommand, args };
}
