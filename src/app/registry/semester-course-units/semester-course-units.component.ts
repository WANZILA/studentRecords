import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { SemesterCourseUnitAllocation } from '../registrar';
import { ActivatedRoute, Router } from '@angular/router';

import { SemesterCourseUnitAllocationService } from '../semesterCourseUnitAllocation.service';
import { Admin_Reg } from '../../admin/admin';
import { AdminService } from 'src/app/admin/admin.service';

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
  intakeDate: {
    required: ' Required'
  },
}

@Component({
  selector: 'app-semester-course-units',
  templateUrl: './semester-course-units.component.html',
  styleUrls: ['./semester-course-units.component.css']
})
export class SemesterCourseUnitsComponent  implements OnInit {
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
     SEMNUM: string;
     COURSEUNITCODE: string;
   
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
       private generalService: SemesterCourseUnitAllocationService,
       private adminServe: AdminService
     ) {
          //define an instance of the validator for use with this form.
          this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
      }
   
     ngOnInit(): void {
       this.generalForm = this.fb.group({
        semesterDateCode: ['', [Validators.required, Validators.minLength(1)]], 
        semesterNum: ['', [Validators.required, Validators.minLength(1)]],
        courseCode: ['', [Validators.required, Validators.minLength(2)]],
        courseUnitCode: ['', [Validators.required, Validators.minLength(2)]],
        adminId: ['', [Validators.required, Validators.minLength(2)]],
        // intakeDate: ['', [Validators.required, Validators.minLength(2)]]
       });
   
           // Read the Id  from the route paramete using an observable
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id1 = params.get('courseCode');
        
        this.SEMCODE =  params.get('semCode');
        this.COURSECODE =  params.get('courseCode');
        this.SEMNUM =  params.get('semNum');
        this.COURSEUNITCODE = params.get('cu');

      //  console.log('id1 ' + id1, semCode);

        this.generalId = params.get('courseCode');
       // console.log('generalId ' + generalId);
        if (this.generalId === '0') {
          this.pageTitle;
          this.generalForm.reset();
          //CODE FOR REFRESHING THE PAGE

        } else {
        const idFinal = id1;
        this.generalId  = idFinal;
        this.pageTitle = `Add: ${idFinal}`;
        this.getAllAdmins();
         
        }

      }
    );
    this.getAllAdmins();
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
     
       // gets it from the admin service in the admin module
       getAllAdmins(): void {
        this.adminServe.getAllAdmins_Reg().subscribe(
          result => {
            this.rowsAdmin = result
          }
        )
      }
     
         // showing the searched generalObjectInterface
     display(): void{
         //updates data to the form
        // const semCode = params.get('semCode');
       //  this.pageTitle = 'Register New SemesterCourseUnitAllocation';
         this.generalForm.get('semesterDateCode').patchValue(this.SEMCODE);
         this.generalForm.get('courseCode').patchValue(this.COURSECODE);
         this.generalForm.get('courseUnitCode').patchValue(this.COURSEUNITCODE);
         this.generalForm.get('semesterNum').patchValue(this.SEMNUM );
     }

     saves(): void{
        
      // console.log(copyGeneralObject)
       if(this.generalForm.valid) {
         if(this.generalForm.dirty) {
          const copyGeneralObject = { ...this.generalObjectInterface, ...this.generalForm.value};
           // let id = this.encordUrl(copyGeneralObject.studentId);
           const id = copyGeneralObject.courseUnitCode;
           console.log('id '+ id);
             // const copyGeneralObject = { ...this.student, ...this.generalForm.getRawValue()};
           console.log(copyGeneralObject);
           // console.log(this.STUDENTID);
           
           //change the studentId ptc_J2021_cit_05 to ptc/J2021/cit/05
           const idReplaced = this.COURSEUNITCODE;
            console.log('idReplaced '+ idReplaced);
          
           
           if(idReplaced == id) { 
            this.generalService.createOne(copyGeneralObject)
            .subscribe({
             next: () => this.onSaveComplete(),
             error: err => this.errorMessage = err
           });        
             
              // this.onSaveComplete();         
           } else {
           //create product
           // let id = this.encordUrl(copyGeneralObject.studentId);
             // this.generalForm.value.reset();
             this.generalService.updateOne(copyGeneralObject)
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



     onSaveComplete(): void{
      // reset the form to clear the warnings
     this.generalForm.reset();
     this.router.navigate(['/registry','semestercourseunitAllocate']);
    //  queryParams: { filterBy: 'er', showImage: true}
      // console.log('yes ');
    }
}
