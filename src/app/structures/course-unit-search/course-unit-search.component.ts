import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { Course, CourseUnit } from '../structure';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseUnitService } from '../courseUnit.service';
import { CourseService } from '../course.service';

const VALIDATION_MESSAGES = {
  //admin

  courseUnitCode:  {
    required: ' Required'
  },
  courseUnitName: {
    required: ' Required'
  },
  description: {
    required: ' Required'
  },
  creditHours: {
    required: ' Required'
  },
  courseCode: {
    required: ' Required'
  },
  coursework: {
    required: ' Required'
  },
  midExam: {
    required: ' Required'
  },
  finalExam: {
    required: ' Required'
  },
  semesterNum:{
    required: ' Required'
  }
}

@Component({
  selector: 'app-course-unit-search',
  templateUrl: './course-unit-search.component.html',
  styleUrls: ['./course-unit-search.component.css']
})

export class CourseUnitSearchComponent implements OnInit {
  //access  every form input fields in our signup html file
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  // reference to FormGroup Model in the html
  // studentForm: FormGroup;
  generalForm: FormGroup;

  // text for creating new CourseUnit Date
  pageTitle = "Add New CourseUnit";
  errorMessage: string;

  // Variable for traking old intakeDates
  INTAKEDATE: string;

  //property intake
  intake: CourseUnit

  //Observable variable to aid in getting the otue parameters
  private sub: Subscription;

  rowsCourse: Course[] = [];
  rows: CourseUnit[] = [];

  //use generic validation message Class
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidatorsService;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private generalService: CourseUnitService
  ) {
    //define an instance of the validator for use with this form.
    this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
  }

  ngOnInit(): void {

    this.generalForm = this.fb.group({
     // departName: ['', [Validators.required, Validators.minLength(2)]],
      courseCode: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.getAllCourses();
    // this.getAll();

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

  getAllCourses(): void {
    this.courseService.getAll().subscribe(
      result => {
        this.rowsCourse = result
      }
    )
  }

  search():void{
    const course = this.generalForm.get('courseCode').value;

    if(course){
      this.getAll(course);
    } else {
      alert('Search not Successiful');
    }
  }

  getAll(course: string): void {
    this.generalService.getAll_Structure(course).subscribe(
      result => {
        this.rows = result
      }
    )
  }

}