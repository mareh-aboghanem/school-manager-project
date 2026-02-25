import { saveTraineeData, loadTraineeData,saveCourseData,loadCourseData} from './storage.js';
import { idGenerator, checkId } from './commenFunction.js';

function addTrainee(firstName, lastName) {
  const TraineeData = loadTraineeData();
  let id = idGenerator(TraineeData);
  if (!firstName || !lastName) {
    throw new Error('ERROR: Must provide first and last name');
  }
  const newTrainee = {
    id: id,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
  };
  const updatedTraineeData = [...TraineeData, newTrainee];
  saveTraineeData(updatedTraineeData);
  // for later i need here to edit how to show this
  console.log('CREATED:', newTrainee);
}

function updateTrainee(id, firstName, lastName) {
  const TraineeData = loadTraineeData();
  if (!id || !firstName || !lastName) {
    throw new Error('ERROR: Must provide ID, first name and last name');
  }
  checkId(TraineeData,id,"Trainee")
  const numberId = Number(id);
  const updatedTraineeData = TraineeData.map((trainee) => {
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
  console.log('UPDATED:', { id, firstName, lastName });
}

function deleteTrainee(id) {
  const TraineeData = loadTraineeData();
  checkId(TraineeData,id,"Trainee")
  // I find the trainee to be deleted so that I can show its details before deleting it.
  const numberId = Number(id);
  const traineeTofind = TraineeData.find((trainee) => trainee.id === numberId);
  const { id:deletedId, firstName, lastName } = traineeTofind;
  console.log('DELETED', { id:deletedId, firstName, lastName });
  // I make a new array of trainees that does not include the deleted trainee.
  const traineeDeleted = TraineeData.filter(
    (trainee) => trainee.id !== numberId
  );
  saveTraineeData(traineeDeleted);
}

function fetchTrainee(id) {
  const TraineeData = loadTraineeData();
  checkId(TraineeData,id,"Trainee")
  const numberId = Number(id);
  // I find the trainee to be geted so that I can show its details.
  const traineeTofind = TraineeData.find((trainee) => trainee.id === numberId);
  const { idToGet, firstName, lastName } = traineeTofind;
  // I find all courses that the trainee has.
  const courses = loadCourseData().filter((course) =>
    course.participants.includes(numberId)
  );
  const coursesName = courses.map((course) => course.name);
  if (coursesName.length === 0) {
    console.log(id, firstName, lastName);
    console.log('Courses: None');
  } else {
    console.log(id, firstName, lastName);
    console.log(`Courses: ${coursesName.join(', ')}`);
  }
}

function fetchAllTrainees() {
  const TraineeData = loadTraineeData();
  let count = TraineeData.length;
  const copiedTraineeData = [...TraineeData];
  let sortedTraineeData = copiedTraineeData.sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );
  console.log('Trainees:');
  sortedTraineeData.forEach((trainee) => {
    const { id:idToGet, firstName, lastName } = trainee;
    console.log(idToGet, firstName, lastName);
  });
  console.log('Total:', count);
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
