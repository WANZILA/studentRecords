import { FnParam } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit,ViewChildren, ElementRef, AfterViewInit,OnDestroy } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder,Validators,AbstractControl } from '@angular/forms';
import {ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime, switchMap,tap } from 'rxjs/operators';



import { Student } from '../student';
import { StudentService } from '../student.service';
// import{ StudentService }from 

import { GenericValidator } from '../../shared/shared/generic-validator';

// const validateDate = require("validate-date");
  

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css']
})
export class EditApplicationComponent implements OnInit, AfterViewInit{

  // access every form input fields in our edit html file
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  
  pageTitle = 'Student Edit';
  errorMessage: string;
  //reference to the FormGroup Model in the html
  generalForm: FormGroup;

  //property student
  student: Student;
  // students: Observable<Student>;

  //data model for managing student data
   // students: Student = new Student();

  //use generic validation message class
  displayMessage: {[key: string]: string } = {};
  private genericValidator: GenericValidator;

  //studentdata
  //student :Student

  //observable variable
  private sub: Subscription;

  // Programme2$: Observable <Student>;

  //id: string;
 

  constructor(private fb: FormBuilder, 
    private route:ActivatedRoute, 
    private router: Router,
    private studentService: StudentService) { 
    //define an instance of the validator for use with this form.
    this.genericValidator = new GenericValidator();
    /* try this / Define an instance of the validator for use with this form,*/
    // // passing in this form's set of validation messages.
    // this.genericValidator = new GenericValidator(this.validationMessages);
    // this.validationMessages = {
    //   productName: {
    //     required: 'Product name is required.',
    //     minlength: 'Product name must be at least three characters.',
    //     maxlength: 'Product name cannot exceed 50 characters.'
    //   },
    //   productCode: {
    //     required: 'Product code is required.'
    //   },
    //   starRating: {
    //     range: 'Rate the product between 1 (lowest) and 5 (highest).'
    //   }
    // };
  }

  ngOnInit(): void {
    // nb add religion 
    this.generalForm = this.fb.group({
      studentId:['',[Validators.required, Validators.minLength(2)]] ,
      title:['',[Validators.required, Validators.minLength(2)]] ,
      fname:['',[Validators.required, Validators.minLength(2)]] ,
      mname:['',[Validators.required, Validators.minLength(2)]] ,
      lname:['',[Validators.required, Validators.minLength(2)]] ,
      birthDate:['',[Validators.required, Validators.minLength(1)]] ,
      gender:['',[Validators.required, Validators.minLength(1)]] ,
      maritalStatus:['',[Validators.required, Validators.minLength(1)]] ,
    // //  // children:['',[Validators.required, Validators.minLength(2)]],
      nation:['',[Validators.required, Validators.minLength(2)]],
      district:['',[Validators.required, Validators.minLength(2)]] ,
      county:['',[Validators.required, Validators.minLength(2)]] ,
      subCounty:['',[Validators.required, Validators.minLength(2)]] ,
      parish:['',[Validators.required, Validators.minLength(2)]] ,
      village:['',[Validators.required, Validators.minLength(2)]] ,
      phoneAddress1:['',[Validators.required, Validators.minLength(1)]] ,
      phoneAddress2:[''] ,
      emailAddress:['',[Validators.required, Validators.minLength(1)]] ,
      educationLevel:['',[Validators.required, Validators.minLength(1)]] ,
      // // keenName:['',[Validators.required, Validators.minLength(2)]] ,
      // // keenRelationship:['',[Validators.required, Validators.minLength(2)]] ,
      // // keenPhone:['',[Validators.required, Validators.minLength(2)]] ,
      // // keenEmail:['',[Validators.minLength(2)]] ,
      // // keenAddress:['',[Validators.required, Validators.minLength(2)]] ,
      // enrollmentStatus:['',[Validators.required, Validators.minLength(1)]] ,
      // // specify:['',[Validators.required, Validators.minLength(2)]],
      // // institutions:['',[Validators.required, Validators.minLength(2)]],
      intakeDate:['',[Validators.required, Validators.minLength(2)]] ,
      branchNum:['',[Validators.required, Validators.minLength(1)]],
      studyprogramme :['',[Validators.required, Validators.minLength(2)]],
      courseCode :['',[Validators.required, Validators.minLength(2)]],
      studentStatus :['',[Validators.required, Validators.minLength(1)]]
      });
      
      //Read the product Id from the route parameter using an observable
      this.sub = this.route.paramMap.subscribe(
        params => {
          //const id = +params.get('id') + cast id into a number;
          // row.studentId
          const studentId = params.get('studentId');
          console.log(studentId);
          this.getStudent(studentId);                 
        }
      );


      
  }
  ngOnDestry(): void{
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void{
    //watches for th blur event from any input element on the form
    const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    //merge the blur even observable with the valueChanges observable
    merge(this.generalForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.generalForm);
    });
  }

  //geting single student id 
  getStudent(studentId: string ): void {
    // console.log(`getting studentId1 ${studentId}`);
    this.studentService.getStudent(studentId)
    .subscribe({
      next: (student: Student) => { 
       this.displayStudent(student)
        // this.generalForm.patchValue({student});
        // console.log(student);
       // console.log(this.generalForm.value);
      },
      error: err => this.errorMessage = err
    });
    // this.generalForm.updateValueAndValidity();
  }


  displayStudent(student: Student): void{
    if(this.generalForm){
      //resets the form
      this.generalForm.reset();
    }

     ///  this.student = student;
    
     
    if(student[0].studentId === ' '){
      this.pageTitle ='Add Student';
    } else{
      // this.pageTitle = `Edit Student: ${this.student.studentId}`;
       this.pageTitle = `Edit Student: ${student[0].studentId}`;
    }

    // update the data on the form
      this.generalForm.patchValue(student[0]);

      // let birth = new Date(this.generalForm.getRawValue('birthDate'));

          this.generalForm.updateValueAndValidity();
    // console.log(student[0]);
  
  }

   //saving the data
  saveStudent(): void{
        
   // console.log(stud)
    if(this.generalForm.valid){
      if(this.generalForm.dirty){
        // validateDate('1992/1/20');
// console.log(validateDate('1992/1/20'));
  
   //console.log(Date());
         
   const stud = { ...this.student, ...this.generalForm.getRawValue()};
       
        // console.log(stud);
        if(stud.studentId === ' '){
          //create product
          this.studentService.createStudent(stud)
           .subscribe({
             next: () => this.onSaveComplete(),
             error: err => this.errorMessage = err
           });
        } else{

           this.studentService.updateStudent(stud)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
           // console.log(stud);
        }
      } else {
        this.onSaveComplete();
      }
    } else{
      this.errorMessage ="Correct the validation errors.";
    }

  }
  encordUrl(text:string){
   // console.log(text);
    return encodeURIComponent(text);
  }

  onSaveComplete(): void{
    //reset the form to clear the warnings
    // this.generalForm.reset();
    // this.router.navigate(['/edit-application']);
    // console.log(this.generalForm.value);
  }

}
