import { saveTraineeData, loadTraineeData } from './storage.js';
import { saveCourseData, loadCourseData } from './storage.js';

function addTrainee(firstName, lastName) {
  const TraineeData = loadTraineeData();
  let id = Math.floor(Math.random() * 100000);
  // I make sure that Id is unique by checking if it already exists.
  while(TraineeData.some(trainee => trainee.id === id)) {
    // If it does, I generate a new random ID until I find one that is not already in use.
    //unique ID - a random number between 0 and 99999.
    id = Math.floor(Math.random() * 100000);
  }
  if (!firstName || !lastName) {
    throw new Error('ERROR: Must provide first and last name');
  }
  const newTrainee = {
    id : id,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    };
  const updatedTraineeData = [...TraineeData, newTrainee];
  saveTraineeData(updatedTraineeData);
  // for later i need here to edit how to show this 
  console.log('CREATED:', newTrainee);
}

function updateTrainee(Id, firstName, lastName) {
  const TraineeData = loadTraineeData();
  if(!Id || !firstName || !lastName) {
    throw new Error('ERROR: Must provide ID, first name and last name');
  }
  // I convert the ID to a number because it is stored as a number in the data, but it is passed as a string from the command line.
  const numberId = Number(Id);
  if (!TraineeData.some(trainee => trainee.id === numberId)) {
    throw new Error(`ERROR: Trainee with ID ${Id} does not exist`);
  }
  const updatedTraineeData = TraineeData.map(trainee => {
    if (trainee.id === numberId) {
      return {
        ...trainee,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };
    }
    return trainee;
  });
  saveTraineeData(updatedTraineeData);
  console.log('UPDATED:', { Id:numberId, firstName, lastName });
  
}

function deleteTrainee(Id) {
  const TraineeData= loadTraineeData();
  const numberId = Number(Id);
  if (!TraineeData.some(trainee => trainee.id === numberId)) {
    throw new Error(`ERROR: Trainee with ID ${Id} does not exist`);
  } 
  // I find the trainee to be deleted so that I can show its details before deleting it.
  const traineeTofind = TraineeData.find(trainee => trainee.id === numberId);
  const{id, firstName, lastName} = traineeTofind;
  console.log('DELETED',{ id, firstName, lastName });
  // I make a new array of trainees that does not include the deleted trainee. 
  const traineeDeleted = TraineeData.filter(trainee => trainee.id !== numberId);
  saveTraineeData(traineeDeleted);
}

function fetchTrainee(Id) {
  const TraineeData = loadTraineeData();
  const numberId = Number(Id);
  if (!TraineeData.some(trainee => trainee.id === numberId)) {
    throw new Error(`ERROR: Trainee with ID ${Id} does not exist`);
  }
  // I find the trainee to be geted so that I can show its details.
  const traineeTofind = TraineeData.find(trainee => trainee.id === numberId);
  const{id, firstName, lastName} = traineeTofind;
  // I find all courses that the trainee has.
  const courses = loadCourseData().filter(course => course.participants.includes(numberId));
  const coursesName= courses.map(course => course.name);
  if (coursesName.length === 0) {
    console.log(id, firstName, lastName);
    console.log('Courses: None');
  }else{
    console.log(id, firstName, lastName);
    console.log(`Courses: ${coursesName.join(', ')}`);
  }
}

function fetchAllTrainees() {
  const TraineeData = loadTraineeData();
  let count = TraineeData.length;
  const copiedTraineeData = [...TraineeData];
  let sortedTraineeData = copiedTraineeData.sort((a, b) => a.lastName.localeCompare(b.lastName));
  console.log('Trainees:');
  sortedTraineeData.forEach(trainee =>{
    const{id, firstName, lastName} = trainee;
    console.log(id, firstName, lastName);
  });
  console.log('Total:',count);
}

export function handleTraineeCommand(subcommand, args) {
  // Read the subcommand and call the appropriate function with the arguments
  if (subcommand === 'ADD') {
    addTrainee(...args);
  } else if (subcommand === 'UPDATE') {
    updateTrainee(...args);
  } else if (subcommand === 'DELETE') {
    deleteTrainee(...args);
  } else if (subcommand === 'GET') {
    fetchTrainee(...args);
  } else if (subcommand === 'GETALL') {
    fetchAllTrainees();
  }
}