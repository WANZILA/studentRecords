import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { Intake } from '../structure';
import { ActivatedRoute, Router } from '@angular/router';
import { IntakeService } from '../intake.service';
import { StringReplaceService } from '../../shared/stringReplace.service';


const VALIDATION_MESSAGES = {
  //admin
  intakeDate: {
    required: ' Required'
  },
  intakeName: {
    required: ' Required'
  }
}

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.css']
})

export class IntakeComponent implements OnInit, AfterViewInit {
  //access  every form input fields in our signup html file
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  // reference to FormGroup Model in the html
  // studentForm: FormGroup;
  generalForm: FormGroup;

  // text for creating new Intake Date
  pageTitle = "Add New Intake";
  errorMessage: string;

  // Variable for traking old intakeDates
  INTAKEDATE: string;

  //property intake
  intake: Intake

  //Observable variable to aid in getting the otue parameters
  private sub: Subscription;



  //use generic validation message Class
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidatorsService;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private generalService: IntakeService,
    private stringReplaceService: StringReplaceService
  ) {
    //define an instance of the validator for use with this form.
    this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
  }


  ngOnInit(): void {
    this.generalForm = this.fb.group({
      intakeDate: ['', [Validators.required, Validators.minLength(2)]],
      intakeName: ['', [Validators.required, Validators.minLength(2)]],
      adminId: ['']
    });

    // Read the Id  from the route paramete using an observable
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id1 = params.get('intakeDate');
        console.log('id1 ' + id1);

        this.INTAKEDATE = params.get('intakeDate');
       // console.log('INTAKEDATE ' + INTAKEDATE);
        if (this.INTAKEDATE === '0') {
          this.pageTitle;
          this.generalForm.reset();
          //CODE FOR REFRESHING THE PAGE

        } else {
        let id2: moment.Moment = moment(id1);
        const idFinal = id2.format('YYYY-MM-DD');
        this.INTAKEDATE  = idFinal;
        this.pageTitle = `Edit: ${idFinal}`;
          this.getOne_Intake(idFinal);
          // console.log(idFinal);
        }

      }
    );


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

 // getting admin details
  getOne_Intake(id: string): void {
    this.generalService.getOne_Intake(id).subscribe({
          next: (intake: Intake) => {
            this.display(intake);
          },
          error: err => this.errorMessage = err
        });
    // if(id){ 
    //   this.generalService.getOne_Intake(id).subscribe({
    //     next: (intake: Intake) => {
    //       this.display(intake);
    //     },
    //     error: err => this.errorMessage = err
    //   });
    //  }
    
  }

  // showing the searched intake
  display(generalInterface: Intake ): void{
    if(this.generalForm){
      //resets the form
      this.generalForm.reset();
    }
    //checks of admin array object has content and displays accordingly


    // this.INTAKEDATE
    // if(generalInterface[0].intakeDate ===' ')
    if( this.INTAKEDATE === '0'){
      this.pageTitle = 'Register New Staff';
    } else {
     // this.pageTitle = `Edit Details: ${generalInterface[0].intakeDate}`;

      //updates data to the form
      this.generalForm.patchValue(generalInterface[0]);

      if(generalInterface[0].intakeDate){
        //gets the intake and birth dates in json string and converts them into 15/08/2020 using moment
        const intakeDate = generalInterface[0].intakeDate;
        // passing the intake variable into moment
        let dateMoment: moment.Moment = moment(intakeDate);
        const birthD = this.generalForm.get('intakeDate').patchValue(dateMoment.format('YYYY-MM-DD'));  
      }
    }

  }

  saves(): void{
        
    // console.log(copyGeneralObject)
     if(this.generalForm.valid) {
       if(this.generalForm.dirty) {
         // validateDate('1992/1/20');
         // console.log(validateDate('1992/1/20'));
   
         //console.log(Date());
         //const copyGeneralObject = this.generalForm.studentId;
        
               
         const copyGeneralObject = { ...this.intake, ...this.generalForm.value};
         // let id = this.encordUrl(copyGeneralObject.studentId);
         let id = copyGeneralObject.intakeDate;
         console.log('id'+ id);
           // const copyGeneralObject = { ...this.student, ...this.generalForm.getRawValue()};
         console.log(copyGeneralObject);
         // console.log(this.STUDENTID);
         
         //change the studentId ptc_J2021_cit_05 to ptc/J2021/cit/05
         let idReplaced = this.INTAKEDATE;
          console.log('idReplaced'+idReplaced);
        
         
         if(idReplaced === id) {         
           this.generalService.updates(copyGeneralObject)
             .subscribe({
               next: () => this.onSaveComplete(),
               error: err => this.errorMessage = err
             }); 
            // this.onSaveComplete();         
         } else {
         //create product
         // let id = this.encordUrl(copyGeneralObject.studentId);
           // this.generalForm.value.reset();
           
           this.generalService.creates(copyGeneralObject)
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

   deletes(): void{
    const deleteObject = { ...this.intake, ...this.generalForm.value};
     if(deleteObject.intakeDate === 0 ) {
       // Don't delete, 
       this.onSaveComplete();
     } else {
       if(confirm(`Are sure you want to Delete: ${deleteObject.intakeName}`)){
         this.generalService.deletes(deleteObject.intakeDate)
         .subscribe({
           next: () => this.onSaveComplete(),
          // error: err => this.errorMessage = err
         });
         this.onSaveComplete();
       }
     }
   } 

   onSaveComplete(): void{
    // reset the form to clear the warnings
    this.generalForm.reset();
    this.router.navigate(['/structure','intakeSearch']);
    // console.log('yes ');
  }

 


  
}
