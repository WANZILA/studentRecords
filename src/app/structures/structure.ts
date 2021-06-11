export interface Intake {
  intakeDate: string,
  intakeName: string
};

export interface SemesterName{
  semesterNum: string,
  semesterName: string
}

export interface SemesterDates{
  semesterDateCode: string, 
  semesterDateName: string, 
  startDate: string, 
  endDate: string, 
  studyProgramme: string
}

export interface Department{
    departCode: string,
    departName: string,
    description: string
}

export interface Course{
    courseCode: string,
    courseName: string,
    description: string,
    departCode: string
}

export interface CourseUnit{
  courseUnitCode: string, 
  courseUnitName: string, 
  description: string, 
  creditHours: string, 
  courseCode: string,
  coursework: string,
  midExam: string,
  finalExam: string, 
  semesterNum: string,
}

export interface Grade{
  gradeCode: string,
  gradeRange: string,
  gradeScore: string,
}

