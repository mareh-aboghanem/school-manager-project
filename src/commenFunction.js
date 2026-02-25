// toFind function also!

export function idGenerator(data) {
    let id = Math.floor(Math.random() * 100000);
  // I make sure that Id is unique by checking if it already exists.
    while (data.some((item) => item.id === id)) {
    // If it does, I generate a new random ID until I find one that is not already in use.
    //unique ID - a random number between 0 and 99999.
    id = Math.floor(Math.random() * 100000);
  }
  return id;
}

export function checkId(data,id,entityName){
// I convert the ID to a number because it is stored as a number in the data, but it is passed as a string from the command line.
  const numberId = Number(id);
  if (!data.some((entity) => entity.id === numberId)) {
    throw new Error(`ERROR: ${entityName} with ID ${id} does not exist`);
  }
}

export function checkDatePattern(startDate){
/* Regex explanation i used it from Ai ^_^:
   ^        → start of the string
   \d{4}    → four digits representing the year
   -        → dash separator
   \d{2}    → two digits representing the month
   -        → dash separator
   \d{2}    → two digits representing the day
   $        → end of the string */
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!pattern.test(startDate)) {
    throw new Error('ERROR: Invalid start date. Must be in yyyy-MM-dd format');
  } 
}
