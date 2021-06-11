import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, } from '@angular/forms';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import * as moment from 'moment';
import { GenericValidatorsService } from '../../shared/generic-validators.service';
import { Grade } from '../structure';
import { ActivatedRoute, Router } from '@angular/router';

import { GradeService } from '../grade.service';

const VALIDATION_MESSAGES = {
  //admin
  gradeCode: {
    required: ' Required'
  },
  gradeRange: {
    required: ' Required'
  },
  gradeScore: {
    required: ' Required'
  }
}

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  //access  every form input fields in our signup html file
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  // reference to FormGroup Model in the html
  // studentForm: FormGroup;
  generalForm: FormGroup;

  // text for creating new Grade Date
  pageTitle = "Add New Grade";
  errorMessage: string;

  // Variable for traking old intakeDates
  generalId: string;

  //property generalObjectInterface
  generalObjectInterface: Grade;

  //Observable variable to aid in getting the otue parameters
  private sub: Subscription;

  // rows: Grade[] = [];

  //use generic validation message Class
  displayMessage: { [key: string]: string } = {};
  private genericValidator: GenericValidatorsService;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private generalService: GradeService
  ) {
    //define an instance of the validator for use with this form.
    this.genericValidator = new GenericValidatorsService(VALIDATION_MESSAGES);
  }

  ngOnInit(): void {
    this.generalForm = this.fb.group({
      gradeCode: ['', [Validators.required, Validators.minLength(1)]],
      gradeRange: ['', [Validators.required, Validators.minLength(1)]],
      gradeScore: ['', [Validators.required, Validators.minLength(1)]]
    });

    // Read the Id  from the route paramete using an observable
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id1 = params.get('gradeCode');
        // console.log('id1 ' + id1);

        this.generalId = params.get('gradeCode');
        // console.log('generalId ' + generalId);
        if (this.generalId === '0') {
          this.pageTitle;
          this.generalForm.reset();
          //CODE FOR REFRESHING THE PAGE

        } else {
          const idFinal = id1;
          this.generalId = idFinal;
          this.pageTitle = `Edit: ${idFinal}`;
          this.getOne(idFinal);
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

  //get one
  getOne(id: string): void {
    this.generalService.getOne(id).subscribe({
      next: (generalInt: Grade) => {
        this.display(generalInt);
      },
      error: err => this.errorMessage = err
    });
  }

  // showing the searched generalObjectInterface
  display(generalInterface: Grade): void {
    if (this.generalForm) {
      //resets the form
      this.generalForm.reset();
    }
    console.log(generalInterface);
    //checks of admin array object has content and displays accordingly
    if (this.generalId === '0') {
      this.pageTitle = 'Register New Grade';
    } else {
      this.pageTitle = `Edit Details: ${generalInterface[0].gradeCode}`;

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
        const id = copyGeneralObject.gradeCode;
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

  deleteOne(): void {
    const deleteObject = { ...this.generalObjectInterface, ...this.generalForm.value };
    if (deleteObject.gradeCode === 0) {
      // Don't delete, 
      alert('Deleting is not possible');
      this.onSaveComplete();
    } else {
      if (confirm(`Are sure you want to Delete: ${deleteObject.gradeCode}`)) {
        this.generalService.deleteOne(deleteObject.gradeCode)
          .subscribe({
            next: () => this.onSaveComplete(),
            // error: err => this.errorMessage = err
          });
        this.onSaveComplete();
      }
    }
  }

  clears(): void {
    this.generalForm.reset();
    this.pageTitle;
  }

  onSaveComplete(): void {
    // reset the form to clear the warnings
    this.generalForm.reset();
    this.router.navigate(['/structure', 'gradeSearch']);
    // console.log('yes ');
  }
}
