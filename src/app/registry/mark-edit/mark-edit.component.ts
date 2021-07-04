import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { Course, CourseUnit, SemesterDates } from '../../structures/structure';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseUnitService } from '../../structures/courseUnit.service';
import { CourseService } from 'src/app/structures/course.service';
import { SemesterDatesService } from 'src/app/structures/semesterDates.service';
import { MarkService } from '../mark.service';
import { Mark } from '../registrar';

const VALIDATION_MESSAGES = {
  //admin
  semesterDateCode: {
    required: ' Required'
  },
  courseCode: {
    required: ' Required'
  },
  courseUnitCode: {
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
  totalMark: {
    required: ' Required'
  },
  gradeCode: {
    required: ' Required'
  }

}

@Component({
  selector: 'app-mark-edit',
  templateUrl: './mark-edit.component.html',
  styleUrls: ['./mark-edit.component.css']
})
export class MarkEditComponent implements OnInit {
  //access  every form input fields in our signup html file
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  // reference to FormGroup Model in the html
  // studentForm: FormGroup;
  generalForm: FormGroup;

  // global variables for accessing passed optional parameters
  SEMCODE: string;
  STUDID: string;
  COURSECODE: string;
  SEMNUM: string;
  COURSEUNITCODE: string;

  // for displaying and hidding the delete button
  isShown: boolean = false;

  toggleShow() {
    this.isShown = !this.isShown;
  }

  // text for creating new CourseUnit Date
  pageTitle: string;
  errorMessage: string;

  // Variable for traking old intakeDates
  generalId: string;

  //property generalObjectInterface
  generalObjectInterface: CourseUnit;

  //Observable variable to aid in getting the otue parameters
  private sub: Subscription;

  rowsSemesterDate: SemesterDates[] = [];
  rowsCourse: Course[] = [];
  rowsCourseUnit: CourseUnit[] = [];
  rowsMark: Mark[] = [];

  // rows: CourseUnit[] = [];

  //use generic validation message Class
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidatorsService;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private generalService: MarkService,
    private semesterDateService: SemesterDatesService,
    private courseService: CourseService,
    private courseUnitService: CourseUnitService,
    private markService: MarkService
  ) {
    //define an instance of the validator for use with this form.
    this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
  }

  ngOnInit(): void {
    this.generalForm = this.fb.group({
      semesterDateCode: ['', [Validators.required, Validators.minLength(1)]],
      semesterNum: [''],
      studentId: ['', [Validators.required, Validators.minLength(1)]],
      courseUnitCode: ['', [Validators.required, Validators.minLength(2)]],
      courseCode: ['', [Validators.required, Validators.minLength(1)]],
      markNum: [''],
      coursework: ['', [Validators.required, Validators.minLength(1)]],
      midExam: ['', [Validators.required, Validators.minLength(1)]],
      finalExam: ['', [Validators.required, Validators.minLength(1)]],
      totalMark: ['', [Validators.required, Validators.minLength(1)]],
      gradeCode: ['', [Validators.required, Validators.minLength(1)]]
    });

    //  this.getAllSemesterDates();
    //  this.getAllCourses();
    //  this.getAllCourseUnits();



    // Read the Id  from the route paramete using an observable
    this.sub = this.route.paramMap.subscribe(
      params => {
        this.SEMCODE = params.get('semCode');
        this.STUDID = params.get('studId');
        this.COURSECODE = params.get('courseCode');
        this.SEMNUM = params.get('semNum');
        this.COURSEUNITCODE = params.get('cu');

        const id1 = params.get('markNum');
        // console.log('id1 ' + id1);

        this.generalId = params.get('markNum');
        // console.log('generalId ' + generalId);

        // displaying the passed optional parameters
        if (this.SEMCODE) {
          // this.pageTitle =`Add New Mark for ${this.STUDID}`;
          this.displayParameters();
        } else if (this.generalId === '0') {
          this.pageTitle;
          this.generalForm.reset();
          //CODE FOR REFRESHING THE PAGE
        } else {
          const idFinal = id1;
          this.generalId = idFinal;
          this.pageTitle = `Edit: ${idFinal}`;
          this.getOne(idFinal);
          console.log(idFinal);
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

  // get semestter dates
  getAllSemesterDates(): void {
    this.semesterDateService.getAll().subscribe(
      result => {
        this.rowsSemesterDate = result
      }

    )
  }
  getAllCourses(): void {
    this.courseService.getAll().subscribe(
      result => {
        this.rowsCourse = result
      }
    )
  }
  getAllCourseUnits(): void {
    this.courseUnitService.getAll().subscribe(
      result => {
        this.rowsCourseUnit = result
      }
    )
  }

  //DISPLAY PASSED optional parameters
  displayParameters(): void {
    //updates data to the form
    // const semCode = params.get('semCode');
    //  this.pageTitle = 'Register New SemesterCourseUnitAllocation';
    this.generalForm.get('semesterDateCode').patchValue(this.SEMCODE);
    this.generalForm.get('studentId').patchValue(this.STUDID);
    this.generalForm.get('courseCode').patchValue(this.COURSECODE);
    this.generalForm.get('courseUnitCode').patchValue(this.COURSEUNITCODE);
    this.generalForm.get('semesterNum').patchValue(this.SEMNUM);
    this.pageTitle = `Add New Mark for ${this.STUDID}`;
  }

  // get one
  getOne(num: string): void {
    this.markService.getOne(num).subscribe({
      next: (marks: Mark) => {
        this.display(marks)
      }
    }) 
  }

  // showing the searched generalObjectInterface
   display(generalInterface: Mark ): void{
     if(this.generalForm){
       //resets the form
       this.generalForm.reset();
     }
     console.log(generalInterface);
     //checks of admin array object has content and displays accordingly
     if(this.generalId ==='0'){
       this.pageTitle = 'Register New CourseUnit';
     } else {
        // this.pageTitle = `Edit Details: ${generalInterface[0].markNum}`;

       //updates data to the form
       this.generalForm.patchValue(generalInterface[0]);
      }

   }

  saves(): void {

    // console.log(copyGeneralObject)
    if (this.generalForm.valid) {
      if (this.generalForm.dirty) {
        // validateDate('1992/1/20');
        // console.log(validateDate('1992/1/20'));

        //console.log(Date());
        //const copyGeneralObject = this.generalForm.studentId;
        const copyGeneralObject = { ...this.generalObjectInterface, ...this.generalForm.value };
        // let id = this.encordUrl(copyGeneralObject.studentId);
        const id = copyGeneralObject.markNum;
        console.log('id ' + id);
        // const copyGeneralObject = { ...this.student, ...this.generalForm.getRawValue()};
        console.log(copyGeneralObject);
        // console.log(this.STUDENTID);

        //change the studentId ptc_J2021_cit_05 to ptc/J2021/cit/05
        const idReplaced = this.generalId;
        console.log('idReplaced ' + idReplaced);


        if (idReplaced == id) {
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
      this.errorMessage = "Correct the validation errors.";
    }

  }

  clears(): void {
    this.generalForm.reset();
    this.pageTitle;
  }

  onSaveComplete(): void {
    // reset the form to clear the warnings
    this.pageTitle = 'Please close this tab';
    this.generalForm.reset();
    console.log('yes ');
  }
}
