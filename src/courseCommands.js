import {
  saveTraineeData,
  loadTraineeData,
  saveCourseData,
  loadCourseData,
} from './storage.js';
import { idGenerator, checkDatePattern, checkId } from './commenFunction.js';

function addCourse(name, startDate) {
  const courseData = loadCourseData();
  let id = idGenerator(courseData);
  if (!name || !startDate) {
    throw new Error('ERROR: Must provide course name and start date');
  }
  checkDatePattern(startDate);
  const newCourse = {
    id: id,
    name: name.trim(),
    startDate: startDate,
    participants: [],
  };
  const updatedCourseData = [...courseData, newCourse];
  saveCourseData(updatedCourseData);
  // REMEBER 
  console.log('CREATED:', newCourse);
}

function updateCourse(id, name, startDate) {
  const courseData = loadCourseData();
  if (!id || !name || !startDate) {
    throw new Error('ERROR: Must provide ID, name and start date.');
  }
  checkId(courseData, id, 'Course');
  const numberId = Number(id);
  checkDatePattern(startDate);
  const updatedCourseData = courseData.map((course) => {
    if (course.id === numberId) {
      return {
        ...course,
        name: name.trim(),
        startDate: startDate,
      };
    }
    return course;
  });
  saveCourseData(updatedCourseData);
  // REMEBER 
  console.log('UPDATED:', { id: numberId, name, startDate });
}

function deleteCourse(id) {
  const courseData = loadCourseData();
  checkId(courseData, id, 'Course');
  const numberId = Number(id);
  // I find the course to be deleted so that I can show its details before deleting it.
  // maybe i need also toFind as seprate function. // REMEBER 
  const courseTofind = courseData.find((course) => course.id === numberId);
  const { id: courseId, name, startDate } = courseTofind;
  // REMEBER 
  console.log('DELETED', { id: courseId, name });
  // I make a new array of courses that does not include the deleted course.
  const updatedCourseData = courseData.filter(
    (course) => course.id !== numberId
  );
  saveCourseData(updatedCourseData);
}

function joinCourse(courseID, traineeID) {
  const courseData = loadCourseData();
  const traineeData = loadTraineeData();
  // 1- Checked if the ID for both was provided.
  if (!courseID || !traineeID) {
    throw new Error('ERROR: Must provide course ID and trainee ID');
  }
  // 2- checked if the ID for both was exist in the Data.
  checkId(courseData, courseID, 'Course');
  checkId(traineeData, traineeID, 'Trainee');
  const numberCourseId = Number(courseID);
  const numberTraineeId = Number(traineeID);
  // 3- checked if the Trainee has already joined in this course.
  const courseTojoin = courseData.find(
    (course) => course.id === numberCourseId
  );
  if (courseTojoin.participants.includes(numberTraineeId)) {
    throw new Error('ERROR: The Trainee has already joined this course');
  }
  // 4- checked how many courses that the Trainee joined.
  const numCoursesForTrainee = courseData.filter((course) =>
    course.participants.includes(numberTraineeId)
  );
  if (numCoursesForTrainee.length >= 5) {
    throw new Error(
      'ERROR: A trainee is not allowed to join more than 5 courses.'
    );
  }
  // 5- checked how many participants in the course.
  if (courseTojoin.participants.length >= 20) {
    throw new Error('ERROR: The course is full.');
  }
  // 6- Updated the Data
  const updatedCourseData = courseData.map((course) => {
    if (course.id === numberCourseId) {
      const newparticipants = [...course.participants, numberTraineeId];
      const newCourse = { ...course, participants: newparticipants };
      return newCourse;
    }
    return course;
  });
  const courseName = courseTojoin.name;
  const trainee = traineeData.find((trainee) => trainee.id === numberTraineeId);
  const traineeName = `${trainee.firstName} ${trainee.lastName}`;
  saveCourseData(updatedCourseData);
  console.log(`${traineeName} Joined ${courseName}`);
}

function leaveCourse(courseID, traineeID) {
  const courseData = loadCourseData();
  const traineeData = loadTraineeData();
  const numberCourseId = Number(courseID);
  const numberTraineeId = Number(traineeID);
  // 1- Checked if the ID for both was provided.
  if (!courseID || !traineeID) {
    throw new Error('ERROR: Must provide course ID and trainee ID');
  }
  checkId(courseData, courseID, 'Course');
  checkId(traineeData, traineeID, 'Trainee');
  //
  const courseToleave = courseData.find(
    (course) => course.id === numberCourseId
  );
  if (!courseToleave.participants.includes(numberTraineeId)) {
    throw new Error('ERROR: The Trainee did not join the course');
  }
  const updatedCourseData = courseData.map((course) => {
    if (course.id === numberCourseId) {
      const newParticipants = course.participants.filter(
        (id) => id !== numberTraineeId
      );
      const newCourse = { ...course, participants: newParticipants };
      return newCourse;
    }
    return course;
  });
  const courseName = courseToleave.name;
  const trainee = traineeData.find((trainee) => trainee.id === numberTraineeId);
  const traineeName = `${trainee.firstName} ${trainee.lastName}`;
  saveCourseData(updatedCourseData);
  console.log(`${traineeName} Left ${courseName}`);
}

function getCourse(id) {
  const courseData = loadCourseData();
  checkId(courseData, id, 'Course');
  const numberId = Number(id);
  const courseTofind = courseData.find((course) => course.id === numberId);
  const { id: courseId, name, startDate } = courseTofind;
  console.log(courseId, name, startDate);
  // I find all trainees that are in the course.
  const traineesInCourse = loadTraineeData().filter((trainee) =>
    courseTofind.participants.includes(trainee.id)
  );
  console.log('participants:' + traineesInCourse.length);
  traineesInCourse.forEach((trainee) => {
    const { id, firstName, lastName } = trainee;
    // REMEBER 
    console.log(id, firstName, lastName);
  });
}

function getAllCourses() {
  const courseData = loadCourseData();
  let count = courseData.length;
  const copiedCourseData = [...courseData];
  let sortedCourseData = copiedCourseData.sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );
  console.log('Courses:');
  sortedCourseData.forEach((course) => {
    const numberOfParticipants =course.participants.length;
    const { id, name, startDate} = course;
    // REMEBER  FULL OR NOT
    console.log(id, name, startDate,numberOfParticipants);
  });
  console.log('Total:', count);
}

export function handleCourseCommand(subcommand, args) {
    if (subcommand === 'ADD') {
    addCourse(...args);
  } else if (subcommand === 'UPDATE') {
    updateCourse(...args);
  } else if (subcommand === 'DELETE') {
    deleteCourse(...args);
  } else if (subcommand === 'GET') {
    getCourse(...args);
  } else if(subcommand === 'JOIN'){
    joinCourse(...args)
  } else if(subcommand==='LEAVE'){
    leaveCourse(...args)
  }else if (subcommand === 'GETALL') {
    getAllCourses();
  }
}
