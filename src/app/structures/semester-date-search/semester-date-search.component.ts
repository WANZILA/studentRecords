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
  semesterName: {
    required: ' Required'
  }
}
@Component({
  selector: 'app-semester-date-search',
  templateUrl: './semester-date-search.component.html',
  styleUrls: ['./semester-date-search.component.css']
})
export class SemesterDateSearchComponent implements OnInit {
 //access  every form input fields in our signup html file
 @ViewChildren(FormControlName, { read: ElementRef })
 formInputElements: ElementRef[];
 // reference to FormGroup Model in the html
 // studentForm: FormGroup;
 generalForm: FormGroup;

 // text for creating new SemesterDates Date
 pageTitle = "Add New SemesterDate";
 errorMessage: string;

 // Variable for traking old intakeDates
 INTAKEDATE: string;

 //property intake
 intake: SemesterDates

    // variables to filter intakes
    searches: SemesterDates [] = [];
    filteredSearch: SemesterDates[];
    _listFilter: string;
 
    //creating a getter to read values and setter to change filtered values
    get listFilter(): string {
      return this._listFilter;
    }
 
    set listFilter(value: string){
      this._listFilter = value;
      this.filteredSearch = this.listFilter ? this.performFilter(this.listFilter): this.searches;
    }
 
    performFilter(filterBy: string): SemesterDates[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.searches.filter((search: SemesterDates) =>
        search.semesterDateName.toLocaleLowerCase().indexOf(filterBy) !==-1);
    }
 

 //Observable variable to aid in getting the otue parameters
 private sub: Subscription;

 rows: SemesterDates[] = [];

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
     semesterNum: ['', [Validators.required, Validators.minLength(2)]],
     semesterName: ['', [Validators.required, Validators.minLength(2)]],
     adminId: ['']
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
