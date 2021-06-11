import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { SemesterDates } from '../structure';
import { ActivatedRoute, Router } from '@angular/router';
import { StringReplaceService } from '../../shared/stringReplace.service';
import { SemesterDatesService } from '../semesterDates.service';

const VALIDATION_MESSAGES = {
  //admin
  semesterDateCode: {
    required: ' Required'
  }, 
  semesterDateName: {
    required: ' Required'
  }, 
  startDate: {
    required: ' Required'
  }, 
  endDate: {
    required: ' Required'
  }, 
  studyProgramme: {
    required: ' Required'
  }
}

@Component({
  selector: 'app-semester-dates',
  templateUrl: './semester-dates.component.html',
  styleUrls: ['./semester-dates.component.css']
})
export class SemesterDatesComponent implements OnInit {

     //access  every form input fields in our signup html file
     @ViewChildren(FormControlName, { read: ElementRef })
     formInputElements: ElementRef[];
     // reference to FormGroup Model in the html
     // studentForm: FormGroup;
     generalForm: FormGroup;
   
     // text for creating new SemesterDates Date
     pageTitle = "Add New SemesterDates";
     errorMessage: string;
   
     // Variable for traking old intakeDates
     generalId: string;
   
     //property generalObjectInterface
     generalObjectInterface: SemesterDates;
   
     //Observable variable to aid in getting the otue parameters
     private sub: Subscription;
   
     // rows: SemesterDates[] = [];
   
     //use generic validation message Class
     displayMessage: { [key: string]: string } = {};
     private genericValidator: GenericValidatorsService;
   
     constructor(
       private fb: FormBuilder,
       private route: ActivatedRoute,
       private router: Router,
       private generalService: SemesterDatesService
     ) {
          //define an instance of the validator for use with this form.
          this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
      }
   
     ngOnInit(): void {
       this.generalForm = this.fb.group({
        semesterDateCode:['', [Validators.required, Validators.minLength(2)]], 
        semesterDateName: ['', [Validators.required, Validators.minLength(2)]], 
        startDate: ['', [Validators.required, Validators.minLength(2)]], 
        endDate: ['', [Validators.required, Validators.minLength(2)]], 
        studyProgramme: ['', [Validators.required, Validators.minLength(2)]]
       });
   
           // Read the Id  from the route paramete using an observable
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id1 = params.get('semesterDateCode');
       // console.log('id1 ' + id1);

        this.generalId = params.get('semesterDateCode');
       // console.log('generalId ' + generalId);
        if (this.generalId === '0') {
          this.pageTitle;
          this.generalForm.reset();
          //CODE FOR REFRESHING THE PAGE

        } else {
        const idFinal = id1;
        this.generalId  = idFinal;
        this.pageTitle = `Edit: ${idFinal}`;
          this.getOne(idFinal);
          // console.log(idFinal);
        }

      }
    );
    //responds to any changes made by the user actions  and updates the semesterCode value accordinlgy
    this.generalForm.get('startDate').valueChanges.subscribe(
      (values) =>{
        this.showsemCode();
      }
    )
     this.generalForm.get('studyProgramme').valueChanges.subscribe(
       (values) =>{
         this.showsemCode();
       }
     )
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
     
       //get one
       getOne(id: string): void {
        this.generalService.getOne(id).subscribe({
              next: (generalInt: SemesterDates) => {
                this.display(generalInt);
              },
              error: err => this.errorMessage = err
            });
      }
     
         // showing the searched generalObjectInterface
     display(generalInterface: SemesterDates ): void{
       if(this.generalForm){
         //resets the form
         this.generalForm.reset();
       }
       console.log(generalInterface);
       //checks of admin array object has content and displays accordingly
       if(this.generalId ==='0'){
         this.pageTitle = 'Register New SemesterDates';
       } else {
         this.pageTitle = `Edit Details: ${generalInterface[0].semesterDateCode}`;
   
         //updates data to the form
         this.generalForm.patchValue(generalInterface[0]);
         
         if(generalInterface[0].startDate && generalInterface[0].endDate){
          // gets the intake and birth dates in json string and converts them into 15/08/2020 using moment
          const startDate = generalInterface[0].startDate;
          // passing the intake variable into moment
          let dateMoment: moment.Moment = moment(startDate);
          const birthD = this.generalForm.get('startDate').patchValue(dateMoment.format('YYYY-MM-DD'));

          const endDate = generalInterface[0].endDate;
          // passing the intake variable into moment
          let dateMoment2: moment.Moment = moment(endDate);
          const birthD2 = this.generalForm.get('endDate').patchValue(dateMoment.format('YYYY-MM-DD'));
        }

        }
   
     }
     showsemCode(): void{
       let startd = this.generalForm.get('startDate').value;

       let endD = this.generalForm.get('studyProgramme').value;
       const finals = this.stringReplaceHypthen(startd)+`${endD}`;
       const semCode = this.generalForm.get('semesterDateCode').patchValue(finals);
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
           const id = copyGeneralObject.semesterDateCode;
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

     stringReplaceHypthen(text:string){
      //  console.log(text); 
      if(text){
        const txt1 = text.replace('-','');
        const txt2 = txt1.replace('-','');
        console.log(txt2);
        return txt2;
      }  else{
        return 'wait';
      }
      
    }
     deleteOne(): void{
      const deleteObject = { ...this.generalObjectInterface, ...this.generalForm.value};
       if(deleteObject.semesterDateCode === 0 ) {
         // Don't delete, 
         alert('Deleting is not possible');
         this.onSaveComplete();
       } else {
         if(confirm(`Are sure you want to Delete: ${deleteObject.semesterDateCode}`)){
           this.generalService.deleteOne(deleteObject.semesterDateCode)
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
      this.router.navigate(['/structure','semesterdateSearch']);
      // console.log('yes ');
    }
}
