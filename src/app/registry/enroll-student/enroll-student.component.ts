import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseUnit_Reg, SemesterDates, Intake, SemesterName } from '../../structures/structure'
import { SemesterDatesService } from 'src/app/structures/semesterDates.service';
import { CourseService } from 'src/app/structures/course.service';
import { SemesterNameService } from 'src/app/structures/semesterName.service';
import { EnrollService } from '../enroll.service';
import { IntakeService } from 'src/app/structures/intake.service';
import { EnrollSingleStudent } from '../registrar';
import { StudentService } from 'src/app/student/student.service';
import { StudyProgramme } from 'src/app/student/student';

const VALIDATION_MESSAGES = {
  //admin
  intakeDate: {
    required: ' Required'
  },
  studyProgramme: {
    required: ' Required'
  },
  courseCode: {
    required: ' Required'
  },
  semesterDateCode: {
    required: ' Required'
  },
  semesterNum:  {
    required: ' Required'
  }
}

@Component({
  selector: 'app-enroll-student',
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css']
})
export class EnrollStudentComponent implements OnInit {
     //access  every form input fields in our signup html file
     @ViewChildren(FormControlName, { read: ElementRef })
     formInputElements: ElementRef[];
     // reference to FormGroup Model in the html
     // studentForm: FormGroup;
     generalForm: FormGroup;
     semesterDatesForm: FormGroup;
   
     // text for creating ne: EnrollSingleStudent  Date
     pageTitle = "Search for students t: EnrollSingleStudent";
     errorMessage: string;
   
     // Variable for traking old intakeDates
     generalId: string;
   
     //property generalObjectInterface
     generalObjectInterface: EnrollSingleStudent ;
   
     //Observable variable to aid in getting the otue parameters
     private sub: Subscription;
     
  
     // semsterDatesData: SemesterDates;
     rowsIntake: Intake[] =[];
     rowsSemesterDate: SemesterDates[] = [];
     rowsSemesterName: SemesterName[] =[];
     rowsCourse: Course[] = [];
     rowsEnroll: EnrollSingleStudent [] = [];
     rowsStudy: StudyProgramme [] = [];
   
     //use generic validation message Class
     displayMessage: { [key: string]: string } = {};
     private genericValidator: GenericValidatorsService;
   
     constructor(
       private fb: FormBuilder,
       private route: ActivatedRoute,
       private router: Router,
       private semesterDateService: SemesterDatesService,
       private courseService: CourseService,
       private enrolledService: EnrollService,
       private intakeService: IntakeService,
       private studentService: StudentService,
       private semesterNameService: SemesterNameService
     ) {
          //define an instance of the validator for use with this form.
          this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
      }
   
     ngOnInit(): void {
       this.generalForm = this.fb.group({
        intakeDate: ['', [Validators.required, Validators.minLength(2)]],
        courseCode: ['', [Validators.required, Validators.minLength(2)]],
        courseName: ['', [Validators.required, Validators.minLength(2)]],
        studyProgramme: ['', [Validators.required, Validators.minLength(1)]],
        semesterDateCode: ['', [Validators.required, Validators.minLength(2)]],
        semesterNum: ['', [ Validators.minLength(2)]],
       });

       this.getAllIntakes();
       this.get_all_StudyProgrammes();
       this.getAllSemesterDates();
       this.getAllCourses();
       this.getAllSemesterNames();
      
     }
   
     ngAfterViewInit(): void {
       //Watch for the blur event fron any input element on the form
       const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
   
       //merge the blur even obserable with the valueChanges observable
       merge(this.generalForm.valueChanges, ...controlBlurs).pipe(
         debounceTime(800)
       ).subscribe(value => {
         this.displayMessage = this.genericValidator.processMessages(this.generalForm);
       });
     }

         // semester names
    getAllIntakes(): void {
      this.intakeService.getAll_Intakes().subscribe(
        result => {
          this.rowsIntake= result
        }
      )
    }

     // get semestter dates
     getAllSemesterDates(): void {
      this.semesterDateService.getAll().subscribe(
        result => {
          this.rowsSemesterDate = result
        }

      )
    }

    getAllSemesterNames(): void {
      this.semesterNameService.getAll().subscribe(
        result => {
          this.rowsSemesterName = result
        }
      )
    }

    get_all_StudyProgrammes(): void {
      this.studentService.get_all_StudyProgrammes().subscribe(
        result => {
          this.rowsStudy = result
        }

      )
    }
    getAllCourses(): void {
      this.courseService.getAll().subscribe(
        result => {
          this.rowsCourse = result
        }
      )
    }




     // get all students from based on the parameters from the enroll service under the registrar
     search(): void{
      
      const intake = this.generalForm.get('intakeDate').value;
      const dateMoment: moment.Moment = moment(intake);
      const intakeD = dateMoment.format('YYYY-MM-DD');
      
      const course = this.generalForm.get('courseCode').value;
      const studyprog = this.generalForm.get('studyProgramme').value;
      const semDates = this.generalForm.get('semesterDateCode').value;
      const semNum = this.generalForm.get('semesterNum').value;
      
      if( intakeD && course && studyprog && semDates && semNum){
        this.enrolledService.get_Students_To_Enroll(intakeD, studyprog, course ).subscribe(
          result => {
           //  this.displayCourseUnits(result);
           this.rowsEnroll = result;
           const cu = this.generalForm.patchValue(this.rowsEnroll[0])
          }
        );
      } else {
        alert('Please fill in the Reqiured fields');
      }

     }

     getSemesterDateCode(){
      const semCode = this.generalForm.get('semesterDateCode').value;
      console.log(semCode);
      return semCode;
     }
     getCourseCode(){
      const courseCode = this.generalForm.get('courseCode').value;
      return courseCode;
     }
     getSemesterNum(){
      const semNum = this.generalForm.get('semesterNum').value;
      return  semNum;
     }
    //  getCourseUnitCode(){
    //   const cu = this.generalForm.get('courseUnitCode').value;
    //   return  cu;
    //  }
        

     // cuinterface 
     displayCourseUnits(cuInterface: CourseUnit_Reg ): void{
      // if(this.generalForm){
      //   //resets the form
      //   this.generalForm.reset();
      // }
      // this.rowCourseUnits = cuInterface;
      let  courseUnits = this.generalForm.patchValue(cuInterface[0]);
      
      console.log(cuInterface);
      
     // this.generalForm.patchValue(cuInterface[0]);
  
    }

    enrollOne():void{
      console.log('UG');
    }


    deleteOne(id: string): void{
     
       if( id === '' ) {
         // Don't delete, 
         alert('Deleting is not possible');
         this.onSaveComplete();
       } else {
         if(confirm(`Are sure you want to Delete: ${id}`)){
           this.enrolledService.deleteOne(id)
           .subscribe({
             next: () => this.onSaveComplete(),
            // error: err => this.errorMessage = err
           });
           this.onSaveComplete();
         }
       }
     } 

     clears(): void{
      this.generalForm.reset();
      this.pageTitle;
    }


     onSaveComplete(): void{
      // reset the form to clear the warnings
     // this.generalForm.reset();
     // this.router.navigate(['/structure','courseUnitSearch']);
      console.log('yes ');
    }
}
