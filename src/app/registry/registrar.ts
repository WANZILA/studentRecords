export interface Enroll{
  markNum: string,
  semesterDateCode: string,
  courseCode: string,
  courseUnitCode: string,
  studentId: string
}

export interface EnrollSingleStudent{
  studentId: string, 
  fname: string, 
  mname: string,
  lname: string
}



export interface Mark{
  markNum: string,
  semesterDateCode: string,
  courseCode: string,
  courseUnitCode: string,
  studentId: string, 
  coursework: string,
  midExam: string,
  finalExam: string, 
  totalMark: string, 
  gradeCode: string 
}

export interface SemesterCourseUnitAllocation{
  allocationNum: string,
  semesterDateCode: string,
  semesterNum: string,
  courseCode: string,
  courseUnitCode: string,
  intakeDate: string,
  adminId: string,
  notes: string
}