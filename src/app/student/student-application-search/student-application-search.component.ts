import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime} from 'rxjs/operators';
import { GenericValidator } from '../../shared/generic-validator';

import{ Student } from '../student';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student-application-search',
  templateUrl: './student-application-search.component.html',
  styleUrls: ['./student-application-search.component.css']
})

export class StudentApplicationSearchComponent implements OnInit, AfterViewInit {
    //access  every form input fields 
    @ViewChildren(FormControlName, {read: ElementRef })
    formInputElements: ElementRef[];
    // reference to FormGroup Model in the html
    // studentForm: FormGroup;
    generalForm: FormGroup;
  
 
   //use generic validation message Class
    displayMessage: {[key: string]: string } = {};
    private genericValidator: GenericValidator;
  
    constructor(private fb: FormBuilder,
      private router: Router,
      private studentService: StudentService) { 
      //define an instance of the validator for use with this form.
      this.genericValidator = new GenericValidator();
    }

    //for displaying data from db
    title: string;
    rows: Student[] = [];

  

  ngOnInit(): void {
    // nb add religion 
    this.generalForm = this.fb.group({
      IntakeDate:['',[Validators.required, Validators.minLength(2)]] ,
      branchNum:['',[Validators.required, Validators.minLength(2)]],
      studyprogramme :['',[Validators.required, Validators.minLength(2)]]
    });

    this.getStudents();
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
 
  getStudents(){
    this.studentService.getStudents().subscribe(
      result => {
        this.rows = result;
      }
    )
  }

  // encordUrl(text:string){
  //   console.log(text);
  //   return encodeURIComponent(text);
  // }
  stringReplace(text:string){
    console.log(text);
   
    const txt1 = text.replace('/','_');
    const txt2 = txt1.replace('/','_');
     const txt3 = txt2.replace('/','_');

    return txt3;
  }

  // fnameControl = new FormControl('');
  save(){
    console.log('Yeah');
  }

}
