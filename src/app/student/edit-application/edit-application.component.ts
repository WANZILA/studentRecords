import { FnParam } from '@angular/compiler/src/output/output_ast';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChildren, ElementRef, AfterViewInit,OnDestroy } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder,Validators,AbstractControl } from '@angular/forms';
import {ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime, switchMap,tap } from 'rxjs/operators';
import * as moment from 'moment';



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
  
     
  // studentid variable
   STUDENTID: string;

  pageTitle = 'Add Student ';
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
    private studentService: StudentService,
    @Inject(DOCUMENT) private _document: Document
    ) { 
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
  //  refreshPage(){
  //    this._document.defaultView.location.reload();
  //  }

  ngOnInit(): void {
    // nb add religion 
    this.generalForm = this.fb.group({
      studentId:['',[Validators.required, Validators.minLength(2)]] ,
      title:['',[Validators.required, Validators.minLength(2)]] ,
      fname:['',[Validators.required, Validators.minLength(2)]] ,
      mname:['null'] ,
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
          this.STUDENTID = params.get('studentId');
          // console.log(STUDENTID);
          // console.log(studentId);
          if(this.STUDENTID==='0'){
            this.pageTitle ='Add student';
           // this.refreshPage();
            this.pageTitle;
            this.generalForm.reset();
          }else{ 
            this.getStudent(studentId);  
          }               
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
        // update the data on the form
       this.generalForm.patchValue(student[0]);

      /* GETING the intake date fron the JSON string and converting it into 15/08/2020*/
      const intake = student[0].intakeDate;
      // passing the intake variable into moment
       let myMoment: moment.Moment = moment(intake);
       //targeting the control intakeDate in the component and updating it with the desired formate
       const intaked = this.generalForm.get('intakeDate').patchValue(myMoment.format('YYYY-MM-DD'));

       const birth = student[0].birthDate;
       // passing the intake variable into moment
        let birthMoment: moment.Moment = moment(birth);
        const birthD = this.generalForm.get('birthDate').patchValue(birthMoment.format('YYYY-MM-DD'));
      
    }   
  }

  //update
  


   //saving the data
  saveStudent(): void{
        
   // console.log(stud)
    if(this.generalForm.valid) {
      if(this.generalForm.dirty) {
        // validateDate('1992/1/20');
        // console.log(validateDate('1992/1/20'));
  
        //console.log(Date());
        //const stud = this.generalForm.studentId;
       
              
        const stud = { ...this.student, ...this.generalForm.value};
        // let studId = this.encordUrl(stud.studentId);
        let studId = stud.studentId;
          // const stud = { ...this.student, ...this.generalForm.getRawValue()};
        console.log(stud);
        // console.log(this.STUDENTID);
        
        //change the studentId ptc_J2021_cit_05 to ptc/J2021/cit/05
        let studentIdReplaced = this.stringReplace2(this.STUDENTID);
        console.log(studentIdReplaced);
        
        if(studentIdReplaced === studId) {         
          this.studentService.updateStudent(stud)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            }); 
            this.onSaveComplete();         
        } else {
        //create product
        // let studId = this.encordUrl(stud.studentId);
          // this.generalForm.value.reset();
          
          this.studentService.createStudent(stud)
           .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
         // console.log(stud);
        }
      } else {
      this.onSaveComplete();
    }

    } else {
      this.errorMessage ="Correct the validation errors.";
    }

  }
  encordUrl(text:string){
    // console.log(text);
     return encodeURIComponent(text);
   }
 
   onSaveComplete(): void{
     // reset the form to clear the warnings
     this.generalForm.reset();
     this.router.navigate(['/adminstudentmenu','studentApplicationSearch']);
     
     // console.log(this.generalForm.value);
   }

   clearStudent(): void{
     this.generalForm.reset();
     this.pageTitle;
   }

   deleteStudent(): void{
    const stud = { ...this.student, ...this.generalForm.value};
     if(stud.studentId === 0 ) {
       // Don't delete, 
       this.onSaveComplete();
     } else {
       if(confirm(`Are sure you want to Delete: ${stud.fname}`)){
         this.studentService.deleteStudent(stud.studentId)
         .subscribe({
           next: () => this.onSaveComplete(),
          // error: err => this.errorMessage = err
         });
         this.onSaveComplete();
       }
     }
   }

   stringReplace2(text:string){
    //  console.log(text);   
    const txt1 = text.replace('_','/');
    const txt2 = txt1.replace('_','/');
     const txt3 = txt2.replace('_','/');
console.log(txt3);
    return txt3;
  }

  // changeDates(target: EventTarget): string{
  //   return ( target as HTMLInputElement).value;

  // }
   

  // changeDates(inputs: string ){
  //   // const inputs = document.getElementByClassNames('dateInputs');
  //  // const inputs = document.querySelector('#intakeDate');

  //  const date = new Date(inputs);
  // let result = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
  //   // let result = date.getDate() +'/' +(date.getMonth()+1) + '/'+ date.getFullYear() ;
  //  // let ress = document.querySelector('#intakeDate').value = result;
  //  console.log( result);
  //  return result;
   
  // }

  // changeDate(){
  //   const intaked = this.generalForm.get('intakeDate').value;
  //   let date =
  // }

  //date 
  // updateDate(event: any) {
  //   // 2021-05-03T21:00:00.000Z
  //   let date = new Date('2021-05-03T21:00:00.000Z')
  //   date = event.target.valueAsDate;
  // }

  // learning
  clickMessage='';

  onClickMe(){
    this.clickMessage ='you are hero';
  } 


  // rs https://angular.io/guide/user-input
  // rs https://stackblitz.com/edit/angular-pqb2xx?file=src%2Fapp%2Fapp.component.ts
  values = "";
  update(value: string){
    //this.value refers to the old value 
    // value references the newly entered value
        //this.values += value + '|';
    if(value){
      this.values = value;
    }      

  }

  //change dates
  // finalDate ='';
  changeDate(values: string){
    const intaked = this.generalForm.get('intakeDate').value;

    //const date = new Date(values);
    //formates the date
   // let result = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
    // let myMoment: moment.Moment = moment(values);
    let myMoment: moment.Moment = moment(intaked);
    //checks if values has content 
    if(values){
      //
      // this.finalDate = result;
      // finalDate = myMoment
      const intaked = this.generalForm.get('intakeDate').patchValue(myMoment.format('L'));
      
    }
  }

}
