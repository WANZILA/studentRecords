import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { Course } from '../structure';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService } from '../course.service';

const VALIDATION_MESSAGES = {
  //admin
  courseCode: {
    required: ' Required'
  },
  departCode: {
    required: ' Required'
  },
  courseName: {
    required: ' Required'
  }

}

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {
     //access  every form input fields in our signup html file
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  // reference to FormGroup Model in the html
  // studentForm: FormGroup;
  generalForm: FormGroup;

  // text for creating new Course Date
  pageTitle = "Add New Course";
  errorMessage: string;

  // Variable for traking old intakeDates
  INTAKEDATE: string;

  //property intake
  intake: Course

  
      // variables to filter intakes
      searches: Course [] = [];
      filteredSearch: Course[];
      _listFilter: string;
   
      //creating a getter to read values and setter to change filtered values
      get listFilter(): string {
        return this._listFilter;
      }
   
      set listFilter(value: string){
        this._listFilter = value;
        this.filteredSearch = this.listFilter ? this.performFilter(this.listFilter): this.searches;
      }
   
      performFilter(filterBy: string): Course[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.searches.filter((search: Course) =>
          search.courseName.toLocaleLowerCase().indexOf(filterBy) !==-1);
      }

  //Observable variable to aid in getting the otue parameters
  private sub: Subscription;

  rows: Course[] = [];

  //use generic validation message Class
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidatorsService;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private generalService: CourseService
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
      {
        next: searches => {
          this.searches = searches
          this.filteredSearch = this.searches;
        },
        error: err => this.errorMessage = err
      }
    )
  }

  }