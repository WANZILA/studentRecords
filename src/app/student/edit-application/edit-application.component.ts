import { Component, OnInit,ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder,Validators,AbstractControl } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GenericValidator } from '../../shared/shared/generic-validator';
import { StudentDetails } from '../student';


@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css']
})
export class EditApplicationComponent implements OnInit, AfterViewInit{

  // access every form input fields in our edit html file
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  //reference to the FormGroup Model in the html
  generalForm: FormGroup;

  //data model for managing student data
  students: StudentDetails = new StudentDetails();

  //use generic validation message class
  displayMessage: {[key: string]: string } = {};
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) { 
    //define an instance of the validator for use with this form.
    this.genericValidator = new GenericValidator();
  }

  ngOnInit(): void {
    // nb add religion 
    this.generalForm = this.fb.group({
      studentId:['',[Validators.required, Validators.minLength(2)]] ,
      title:['',[Validators.required, Validators.minLength(2)]] ,
      fname:['',[Validators.required, Validators.minLength(2)]] ,
      mName:['',[Validators.required, Validators.minLength(2)]] ,
      lname:['',[Validators.required, Validators.minLength(2)]] ,
      birthDate:['',[Validators.required, Validators.minLength(2)]] ,
      gender:['',[Validators.required, Validators.minLength(2)]] ,
      maritalStatus:['',[Validators.required, Validators.minLength(2)]] ,
      children:['',[Validators.required, Validators.minLength(2)]],
      nation:['',[Validators.required, Validators.minLength(2)]],
      district:['',[Validators.required, Validators.minLength(2)]] ,
      county:['',[Validators.required, Validators.minLength(2)]] ,
      subCounty:['',[Validators.required, Validators.minLength(2)]] ,
      parish:['',[Validators.required, Validators.minLength(2)]] ,
      village:['',[Validators.required, Validators.minLength(2)]] ,
      phoneAddress1:['',[Validators.required, Validators.minLength(2)]] ,
      phoneAddress2:['',[ Validators.minLength(2)]] ,
      emailAddress:['',[Validators.required, Validators.minLength(2)]] ,
      keenName:['',[Validators.required, Validators.minLength(2)]] ,
      keenRelationship:['',[Validators.required, Validators.minLength(2)]] ,
      keenPhone:['',[Validators.required, Validators.minLength(2)]] ,
      keenEmail:['',[Validators.minLength(2)]] ,
      keenAddress:['',[Validators.required, Validators.minLength(2)]] ,
      educationLevel:['',[Validators.required, Validators.minLength(2)]] ,
      specify:['',[Validators.required, Validators.minLength(2)]],
      institutions:['',[Validators.required, Validators.minLength(2)]],
      IntakeDate:['',[Validators.required, Validators.minLength(2)]] ,
      branchNum:['',[Validators.required, Validators.minLength(2)]],
      studyprogramme :['',[Validators.required, Validators.minLength(2)]]
      });
  }

  ngAfterViewInit(): void{
    //watches for th blur event from any input element on the form
    const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    //merge the blur even observable with the valueChanges observable
    merge(this.generalForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.generalForm);
    });
  }
  //saving the data
  save(){

  }

}
