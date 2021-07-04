import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { Enroll, Mark  } from '../registrar';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseUnit, CourseUnit_MarkSearch, CourseUnit_Reg, SemesterDates, SemesterName} from '../../structures/structure'
import { SemesterDatesService } from 'src/app/structures/semesterDates.service';
import { CourseService } from 'src/app/structures/course.service';
import { SemesterNameService } from 'src/app/structures/semesterName.service';
import { EnrollService } from '../enroll.service';
import { MarkService } from '../mark.service';
import { CourseUnitService } from 'src/app/structures/courseUnit.service';

const VALIDATION_MESSAGES = {
  //admin
  semesterDateCode: {
    required: ' Required'
  },
  semesterNum: {
    required: ' Required'
  },
  courseCode: {
    required: ' Required'
  },
  courseUnitCode: {
    required: ' Required'
  }

}

@Component({
  selector: 'app-mark-search',
  templateUrl: './mark-search.component.html',
  styleUrls: ['./mark-search.component.css']
})


export class MarkSearchComponent implements OnInit {
     //access  every form input fields in our signup html file
     @ViewChildren(FormControlName, { read: ElementRef })
     formInputElements: ElementRef[];
     // reference to FormGroup Model in the html
     // studentForm: FormGroup;
     generalForm: FormGroup;
     semesterDatesForm: FormGroup;
     
     // text for creating new Enroll  Date
     pageTitle = "Search Students marks";
     errorMessage: string;
   
     // Variable for traking old intakeDates
     generalId: string;
   
     //property generalObjectInterface
     generalObjectInterface: Enroll ;
   
     //Observable variable to aid in getting the otue parameters
     private sub: Subscription;
     
     // rows: Enroll [] = [];
     // semsterDatesData: SemesterDates;

     rowsSemesterDate: SemesterDates[] = [];
     rowsSemesterName: SemesterName[] =[];
     rowsCourse: Course[] = [];
     rowsCourseUnit: CourseUnit_Reg [] = [];
     rowsMark: Mark[] =[];
     // rowsMark: Enroll [] = [];
   
     //use generic validation message Class
     displayMessage: { [key: string]: string } = {};
     private genericValidator: GenericValidatorsService;
   
     constructor(
       private fb: FormBuilder,
       private route: ActivatedRoute,
       private router: Router,
       private semesterDateService: SemesterDatesService,
       private semesterNameService: SemesterNameService,
       private courseService: CourseService,
       private courseUnitService: CourseUnitService,
       private markService: MarkService
     ) {
          //define an instance of the validator for use with this form.
          this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
      }
   
     ngOnInit(): void {
       this.generalForm = this.fb.group({
        semesterDateCode: ['', [Validators.required, Validators.minLength(2)]], 
        semesterNum: ['', [Validators.required, Validators.minLength(1)]], 
        courseCode: ['', [Validators.required, Validators.minLength(2)]],
        courseUnitCode: ['', [Validators.required, Validators.minLength(2)]],
        MarkNum: ['', [ Validators.minLength(2)]],
       });

       
    this.getAllSemesterDates();
    this.getAllCourses();
    this.getAllSemesterNames(); 
    // this.getAllMarks();
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

     // get semestter dates
     getAllSemesterDates(): void {
      this.semesterDateService.getAll().subscribe(
        result => {
          this.rowsSemesterDate = result
        }

      )
    }

    // semester names
    getAllSemesterNames(): void {
      this.semesterNameService.getAll().subscribe(
        result => {
          this.rowsSemesterName = result;
          // let  courseUnits = this.generalForm.get('courseUnitCode').patchValue(this.rowsSemesterName);
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

    getAllCourseUnit(course, sem): void {
      this.courseUnitService.get_CourseUnit_Reg(course, sem).subscribe(
        result => {
          this.rowsCourseUnit = result
        }
      )
    }

    searchCourseUnits(): void {
      const course = this.generalForm.get('courseCode').value;
      const sem = this.generalForm.get('semesterNum').value;
      if(course){
        this.getAllCourseUnit( course, sem );
      }
    }

    // clears all the courseunits and course
    clearCourses():void{
      const sem = this.generalForm.get('semesterNum').value;
      const course = this.generalForm.get('courseCode').value;
      const cu = this.generalForm.get('courseUnitCode').value;

      if(sem){
        this.generalForm.get('courseCode').patchValue('');
        this.generalForm.get('courseUnitCode').patchValue('');
      }
    }


     // get all students from based on the parameters from the enroll service under the registrar
     search(): void{
      const courseUnit = this.generalForm.get('courseUnitCode').value;
      // const sem = this.generalForm.get('semesterNum').value;
      const semDate = this.generalForm.get('semesterDateCode').value
      
      this.markService.getAll(semDate, courseUnit).subscribe(
        result => {
         //  this.displayCourseUnits(result);
         this.rowsMark = result;
       
        }
      );

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
     getCourseUnitCode(){
      const courseUnit = this.generalForm.get('courseUnitCode').value;
      return  courseUnit;
     }
        

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


    deleteOne(markNum: string): void{
      // const deleteObject = { ...this.generalObjectInterface, ...this.generalForm.value};
       if(markNum === ' ' ) {
         // Don't delete, 
         alert('Deleting is not possible');
         this.onSaveComplete();
       } else {
         if(confirm(`Are sure you want to Delete: ${markNum}`)){
           this.markService.deleteOne(markNum)
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
