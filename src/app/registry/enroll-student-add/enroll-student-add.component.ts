import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { SemesterCourseUnitAllocation } from '../registrar';
import { ActivatedRoute, Router } from '@angular/router';

import { EnrollService } from '../enroll.service';
import { Admin_Reg } from '../../admin/admin';
import { AdminService } from 'src/app/admin/admin.service';

const VALIDATION_MESSAGES = {
  //admin
  semesterDateCode: {
    required: ' Required'
  },
  studentId: {
    required: ' Required'
  },
  courseCode: {
    required: ' Required'
  }
}

@Component({
  selector: 'app-enroll-student-add',
  templateUrl: './enroll-student-add.component.html',
  styleUrls: ['./enroll-student-add.component.css']
})
export class EnrollStudentAddComponent  implements OnInit {
     //access  every form input fields in our signup html file
     @ViewChildren(FormControlName, { read: ElementRef })
     formInputElements: ElementRef[];
     // reference to FormGroup Model in the html
     // studentForm: FormGroup;
     generalForm: FormGroup;
   
     // text for creating new SemesterCourseUnitAllocation Date
     pageTitle = "Add New SemesterCourseUnitAllocation";
     errorMessage: string;
      
     //global variables for accessing the passed optional parameters
     SEMCODE: string;
     COURSECODE: string;
     STUDENTID: string;
     SEMNUM: string;
   
     // Variable for traking old intakeDates
     generalId: string;

     rowsAdmin: Admin_Reg[] = [];
   
     //property generalObjectInterface
     generalObjectInterface: SemesterCourseUnitAllocation;
   
     //Observable variable to aid in getting the otue parameters
     private sub: Subscription;
   
     // rows: SemesterCourseUnitAllocation[] = [];
   
     //use generic validation message Class
     displayMessage: { [key: string]: string } = {};
     private genericValidator: GenericValidatorsService;
   
     constructor(
       private fb: FormBuilder,
       private route: ActivatedRoute,
       private router: Router,
       private generalService: EnrollService,
       private adminServe: AdminService
     ) {
          //define an instance of the validator for use with this form.
          this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
      }
   
     ngOnInit(): void {
       this.generalForm = this.fb.group({
        semesterDateCode: ['', [Validators.required, Validators.minLength(1)]], 
        studentId: ['', [Validators.required, Validators.minLength(1)]],
        courseCode: ['', [Validators.required, Validators.minLength(2)]],
        semesterNum: ['', [Validators.required, Validators.minLength(1)]]
       });
   
           // Read the Id  from the route paramete using an observable
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id1 = params.get('studId');
        
        this.SEMCODE =  params.get('semCode');
      
        this.SEMNUM =  params.get('semNum');
        this.COURSECODE =  params.get('courseCode');        
        this.STUDENTID = params.get('studId');

      console.log('id1 ', this.SEMCODE, this.SEMNUM,  this.COURSECODE, this.STUDENTID  );

        this.generalId = params.get('studentId');
       // console.log('generalId ' + generalId);
        if (this.generalId === '0') {
          this.pageTitle;
          this.generalForm.reset();
          //CODE FOR REFRESHING THE PAGE

        } else {
        const idFinal = id1;
        this.generalId  = idFinal;
        this.pageTitle = `Enroll Student: ${this.generalId}`;
       
        }

      }
    );
   
    this.display();
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
     
         // showing the searched generalObjectInterface
     display(): void{
         //updates data to the form
        // const semCode = params.get('semCode');
       //  this.pageTitle = 'Register New SemesterCourseUnitAllocation';
         this.generalForm.get('semesterDateCode').patchValue(this.SEMCODE);
         this.generalForm.get('semesterNum').patchValue(this.SEMNUM );
         this.generalForm.get('courseCode').patchValue(this.COURSECODE);
         this.generalForm.get('studentId').patchValue(this.STUDENTID);
        
     }

     saves(): void{
        
      // console.log(copyGeneralObject)
       if(this.generalForm.valid) {
         if(this.generalForm.value) {
          const copyGeneralObject = { ...this.generalObjectInterface, ...this.generalForm.value};
           const id = copyGeneralObject.studentId;
           console.log('id '+ id);
             // const copyGeneralObject = { ...this.student, ...this.generalForm.getRawValue()};
           console.log(copyGeneralObject);
           // console.log(this.STUDENTID);
           
            const idReplaced = this.STUDENTID;
            console.log('idReplaced '+ idReplaced);
          
           
           if(idReplaced == id) { 
             console.log(idReplaced);
            this.generalService.createOne(copyGeneralObject)
            .subscribe({
             next: () => this.onSaveComplete(),
             error: err => this.errorMessage = err
           });        
             
              // this.onSaveComplete();         
           } else {
             alert('unable to save');
           }
         } else {
         // this.onSaveComplete();
         alert('Unable to save 1 ');
       }
   
       } else {
         this.errorMessage ="Correct the validation errors.";
       }
   
     }



     onSaveComplete(): void{
      // reset the form to clear the warnings
    // this.generalForm.reset();
    //this.router.navigate(['/registry','enrollstudent']);
    
      console.log('yes ');
    }
}
