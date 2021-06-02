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
import { GenericValidator } from 'src/app/shared/generic-validator';

const VALIDATION_MESSAGES = {
  //admin
  intakeDate: {
    required: ' Required'
  },
  intakeName: {
    required: 'Required'
  }
}

@Component({
  selector: 'app-intake-search',
  templateUrl: './intake-search.component.html',
  styleUrls: ['./intake-search.component.css']
})

export class IntakeSearchComponent implements OnInit {
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

  rows: Intake[] = [];

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

    this.getAll_Intakes(); 

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

  //get all intakes
  getAll_Intakes(): void {
    this.generalService.getAll_Intakes().subscribe(
      result => {
        this.rows = result
      }
    )
  }

  // showing the searched intake
  display(generalInterface: Intake ): void{
    if(this.generalForm){
      //resets the form
      this.generalForm.reset();
    }
    //checks of admin array object has content and displays accordingly
    if(generalInterface[0].intakeDate ===' '){
      this.pageTitle = 'Register New Staff';
    } else {
      this.pageTitle = `Edit Details: ${generalInterface[0].intakeDate}`;

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



   onSaveComplete(): void{
    // reset the form to clear the warnings
    this.generalForm.reset();
    // this.router.navigate(['/adminmenu','adminSearch']);
   // console.log('yes ');
  }

 


  
}
