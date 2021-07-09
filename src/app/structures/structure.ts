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

export interface Branch{
  branchNum: string,
  branchName: string
}

export interface StudyProgramme{
  studyprogramme: string,
  studyprogrammeName: string
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
  semesterNum: string
}
// used in the registrar module for allocating courseunits to admins/ lecturers 
export interface CourseUnit_Reg{
  courseUnitCode: string, 
  courseUnitName: string,
  courseCode: string,
  semesterNum: string
}

export interface CourseUnit_MarkSearch{
  courseUnitCode: string, 
  courseUnitName: string
}


export interface Grade{
  gradeCode: string,
  gradeRange: string,
  gradeScore: string
}

