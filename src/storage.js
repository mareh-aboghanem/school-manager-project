import fs from 'node:fs';

const TRAINEE_DATA_FILE_PATH = './data/trainees.json';
const COURSE_DATA_FILE_PATH = './data/courses.json';

export function loadTraineeData() {
try{
  const traineeData =fs.readFileSync(TRAINEE_DATA_FILE_PATH, 'utf8');
  return JSON.parse(traineeData);  
}catch(error){
 return [];
}
}

export function saveTraineeData(traineeData) {
  try{
    const jsonTrainee = JSON.stringify(traineeData,null,2);
    fs.writeFileSync(TRAINEE_DATA_FILE_PATH,jsonTrainee);
  }catch(error){
    throw new Error('Saving Trainee Data is failed'+error.message);
  }
}

export function loadCourseData() {
  try{
    const courseData=fs.readFileSync(COURSE_DATA_FILE_PATH,'utf8');
    return JSON.parse(courseData);
  }catch(error){
    return [];
  }
}

export function saveCourseData(courseData) {
  try{
    const jsonCourse = JSON.stringify(courseData,null,2);
    fs.writeFileSync(COURSE_DATA_FILE_PATH,jsonCourse);
  }catch(error){
    throw new Error('Saving Course Data is failed'+error.message);
  }
}
