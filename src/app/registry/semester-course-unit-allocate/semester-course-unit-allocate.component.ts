import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { SemesterCourseUnitAllocation } from '../registrar';
import { ActivatedRoute, Router } from '@angular/router';

import { SemesterCourseUnitAllocationService } from '../semesterCourseUnitAllocation.service';
import { Course, CourseUnit_Reg, SemesterDates, SemesterName } from '../../structures/structure'
import { SemesterDatesService } from 'src/app/structures/semesterDates.service';
import { CourseService } from 'src/app/structures/course.service';
import { SemesterNameService } from 'src/app/structures/semesterName.service';
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

}

@Component({
  selector: 'app-semester-course-unit-allocate',
  templateUrl: './semester-course-unit-allocate.component.html',
  styleUrls: ['./semester-course-unit-allocate.component.css']
})
export class SemesterCourseUnitAllocateComponent implements OnInit {
     //access  every form input fields in our signup html file
     @ViewChildren(FormControlName, { read: ElementRef })
     formInputElements: ElementRef[];
     // reference to FormGroup Model in the html
     // studentForm: FormGroup;
     generalForm: FormGroup;
     semesterDatesForm: FormGroup;
   
     // text for creating new SemesterCourseUnitAllocation Date
     pageTitle = "Add New SemesterCourseUnitAllocation";
     errorMessage: string;
   
     // Variable for traking old intakeDates
     generalId: string;
   
     //property generalObjectInterface
     generalObjectInterface: SemesterCourseUnitAllocation;
   
     //Observable variable to aid in getting the otue parameters
     private sub: Subscription;
     
     // rows: SemesterCourseUnitAllocation[] = [];
     // semsterDatesData: SemesterDates;

     rowsSemesterDate: SemesterDates[] = [];
     rowsCourse: Course[] = [];
     rowsSemesterName: SemesterName[] =[];
     rowsCourseUnit: CourseUnit_Reg[] = [];
   
     //use generic validation message Class
     displayMessage: { [key: string]: string } = {};
     private genericValidator: GenericValidatorsService;
   
     constructor(
       private fb: FormBuilder,
       private route: ActivatedRoute,
       private router: Router,
       private generalService: SemesterCourseUnitAllocationService,
       private semesterDateService: SemesterDatesService,
       private courseService: CourseService,
       private courseunitService: CourseUnitService,
       private semesterNameService: SemesterNameService
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
        courseUnitName:['', [Validators.required, Validators.minLength(2)]],
        adminId: ['', [Validators.required, Validators.minLength(2)]],
        intakeDate: ['', [Validators.required, Validators.minLength(2)]],
        semesterName: ['', [ Validators.minLength(2)]],
       });

      //  this.semesterDatesForm = this.fb.group({
      //   semesterNum: ['', [Validators.required, Validators.minLength(2)]],
      //   semesterName: ['', [Validators.required, Validators.minLength(2)]],
      //  })
   
           // Read the Id  from the route paramete using an observable
    // this.sub = this.route.paramMap.subscribe(
    //   params => {
    //     const id1 = params.get('allocationNum');
    //    // console.log('id1 ' + id1);

    //     this.generalId = params.get('allocationNum');
    //    // console.log('generalId ' + generalId);
    //     if (this.generalId === '0') {
    //       this.pageTitle;
    //       this.generalForm.reset();
    //       //CODE FOR REFRESHING THE PAGE

    //     } else {
    //     const idFinal = id1;
    //     this.generalId  = idFinal;
    //     this.pageTitle = `Edit: ${idFinal}`;
    //       this.getOne(idFinal);
    //       // console.log(idFinal);
    //     }

    //   }
    // );  
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

     // get semestter dates
     getAllSemesterDates(): void {
      this.semesterDateService.getAll().subscribe(
        result => {
          this.rowsSemesterDate = result
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

    // semester names
    getAllSemesterNames(): void {
      this.semesterNameService.getAll().subscribe(
        result => {
          this.rowsSemesterName = result
        }
      )
    }

   
         // showing the searched generalObjectInterface
    //  display(generalInterface: SemesterCourseUnitAllocation ): void{
    //    if(this.generalForm){
    //      //resets the form
    //      this.generalForm.reset();
    //    }
    //    console.log(generalInterface);
       
    //   this.generalForm.patchValue(generalInterface[0]);
   
    //  }
     // get all courseunits from based on the parameters from the courseunit service under the structures
     search(): void{
      const course = this.generalForm.get('courseCode').value;
      const sem = this.generalForm.get('semesterNum').value;
      
      this.courseunitService.get_CourseUnit_Reg(course, sem).subscribe(
        result => {
         //  this.displayCourseUnits(result);
         this.rowsCourseUnit = result;
         const cu = this.generalForm.patchValue(this.rowsCourseUnit[0])
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
      const cu = this.generalForm.get('courseUnitCode').value;
      return  cu;
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

     saves(): void{
        
      // console.log(copyGeneralObject)
       if(this.generalForm.valid) {
         if(this.generalForm.dirty) {
           // validateDate('1992/1/20');
           // console.log(validateDate('1992/1/20'));
     
           //console.log(Date());
           //const copyGeneralObject = this.generalForm.studentId;
          
                 
           const copyGeneralObject = { ...this.generalObjectInterface, ...this.generalForm.value};
           // let id = this.encordUrl(copyGeneralObject.studentId);
           const id = copyGeneralObject.allocationNum;
           console.log('id '+ id);
             // const copyGeneralObject = { ...this.student, ...this.generalForm.getRawValue()};
           console.log(copyGeneralObject);
           // console.log(this.STUDENTID);
           
           //change the studentId ptc_J2021_cit_05 to ptc/J2021/cit/05
           const idReplaced = this.generalId;
            console.log('idReplaced '+ idReplaced);
          
           
           if(idReplaced == id) {         
             this.generalService.updateOne(copyGeneralObject)
               .subscribe({
                 next: () => this.onSaveComplete(),
                 error: err => this.errorMessage = err
               }); 
              // this.onSaveComplete();         
           } else {
           //create product
           // let id = this.encordUrl(copyGeneralObject.studentId);
             // this.generalForm.value.reset();
             
             this.generalService.createOne(copyGeneralObject)
              .subscribe({
               next: () => this.onSaveComplete(),
               error: err => this.errorMessage = err
             });
            // console.log(copyGeneralObject);
           }
         } else {
         this.onSaveComplete();
       }
   
       } else {
         this.errorMessage ="Correct the validation errors.";
       }
   
     }

     deleteOne(): void{
      const deleteObject = { ...this.generalObjectInterface, ...this.generalForm.value};
       if(deleteObject.allocationNum === 0 ) {
         // Don't delete, 
         alert('Deleting is not possible');
         this.onSaveComplete();
       } else {
         if(confirm(`Are sure you want to Delete: ${deleteObject.allocationNum}`)){
           this.generalService.deleteOne(deleteObject.allocationNum)
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
