import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { Department } from '../structure';
import { ActivatedRoute, Router } from '@angular/router';
import { StringReplaceService } from '../../shared/stringReplace.service';
import { DepartmentService } from '../department.service';

const VALIDATION_MESSAGES = {
  //admin
  departName: {
    required: ' Required'
  }
}
@Component({
  selector: 'app-department-search',
  templateUrl: './department-search.component.html',
  styleUrls: ['./department-search.component.css']
})
export class DepartmentSearchComponent implements OnInit {
     //access  every form input fields in our signup html file
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  // reference to FormGroup Model in the html
  // studentForm: FormGroup;
  generalForm: FormGroup;

  // text for creating new Department Date
  pageTitle = "Add New Department";
  errorMessage: string;

  // Variable for traking old intakeDates
  INTAKEDATE: string;

  //property intake
  intake: Department

  //Observable variable to aid in getting the otue parameters
  private sub: Subscription;

  rows: Department[] = [];

  //use generic validation message Class
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidatorsService;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private generalService: DepartmentService
  ) {
       //define an instance of the validator for use with this form.
       this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
   }

  ngOnInit(): void {

    this.generalForm = this.fb.group({
      departName: ['', [Validators.required, Validators.minLength(2)]]      
    });

    this.getAll();

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
  
  getAll(): void {
    this.generalService.getAll().subscribe(
      result => {
        this.rows = result
      }
    )
  }

  }