import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControlName, AbstractControl } from '@angular/forms';
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime} from 'rxjs/operators';
import { GenericValidator } from '../../shared/shared/generic-validator';

const VALIDATION_MESSAGES = {
  //admin
  Year:{
    required:' Required'
  }
}

@Component({
  selector: 'app-intake',
  templateUrl: './intake.component.html',
  styleUrls: ['./intake.component.css']
})
export class IntakeComponent implements OnInit, AfterViewInit {
  //access  every form input fields in our signup html file
  @ViewChildren(FormControlName, {read: ElementRef })
  formInputElements: ElementRef[];
  // reference to FormGroup Model in the html
  // studentForm: FormGroup;
  generalForm: FormGroup;

 //use generic validation message Class
  displayMessage: {[key: string]: string } = {};
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) { 
    //define an instance of the validator for use with this form.
    this.genericValidator = new GenericValidator();
  }
  

  ngOnInit(): void {
    this.generalForm = this.fb.group({
      adminId:['',[Validators.required, Validators.minLength(2)]] ,
      passwords:['',[Validators.required, Validators.minLength(2)]]
    });
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


  // fnameControl = new FormControl('');
  save(){
    console.log('Yeah');
  }

}
